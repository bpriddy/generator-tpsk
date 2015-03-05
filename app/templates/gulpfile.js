/*************************************************

  This gulpfile processes 3 sections of a website:
  The Front-end is client facing
  The CMS CRUDs data in the database
  The API is a RESTful API that facilitates CRUD from both the front-end and CMS

 *************************************************/

var argv       = require('yargs').argv;
var fs         = require('fs');
var path       = require('path');
var _          = require("lodash");
var gulp       = require('gulp');
var sequence   = require("run-sequence");
var rename     = require('gulp-rename');
var watch      = require('gulp-watch');
var livereload = require('gulp-livereload');
var chmod      = require('gulp-chmod');
var gutil      = require('gulp-util');
var joinData   = require('gulp-join-data');
var express    = require('express');///
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');///
var sourcemaps = require('gulp-sourcemaps');
var debug      = require('gulp-debug');
var tap        = require('gulp-tap');
var colors 	   = require('colors');
var pubsub 	   = require('node-pubsub');

var project_config = require('./project.config.json');

var watchDomainTasks = _.map(project_config.domains,function(domain) {
	return domain.title;
});

/*************************************************
TASKS
 *************************************************/

var processes = {};
_.forIn(project_config.task_hash, function(value,key) {
	processes[key] = require('./gulp-tasks/' + value + '.js');
});

_.forIn(processes, function(value,key){
	processes[key] = new value(gulp,pubsub);
});

_.each(project_config.domains, function(domain){
	TaskFactory(domain);
});

/*************************************************
 TASK FACTORY
 *************************************************/

function TaskFactory(domain) {
	function concatDomainTask(d,t) {
		return d+"-"+t;
	};
	var dtasks = [],
		tasks  = [];
	_.each(domain.tasks, function(obj, i) {
		if(processes[ domain.tasks[i] ]) {
			dtasks.push( concatDomainTask(domain.title,domain.tasks[i]) );
			tasks.push(domain.tasks[i])
		} else {
			throw new Error("the task '".red+domain.tasks[i].yellow+"' in '".red+domain.title.yellow+"' is not an available task in the gulpfile \n\n".red);
		}
	});
	gulp.task(domain.title, dtasks, function(cb){cb();});
	_.each(tasks, function(task, i) {
		if(processes[task].init) { processes[task].init(domain); };
		gulp.task(concatDomainTask(domain.title,task), function() {
			return processes[task].run(domain, project_config.languages).on('end', function() {
				var args = {  domain:domain,  languages:project_config.languages };
				pubsub.publish(concatDomainTask(domain.title,task), [args], this);
			});
		});
	});
};

/*************************************************
 WATCH BUILD
 *************************************************/

var lrserver;

gulp.task('watch', watchDomainTasks, function() {

	lrserver = livereload();
	livereload.listen(project_config.livereloadport);
	_.each(project_config.domains, function(domain) {
		_.each(domain.tasks, function(task) {
			if(processes[task].watch) {
				processes[task].watch(domain.title);
			}
		});
		gulp.watch('./dist/' + domain.title + '/**/*.html',
			notifyLiveReload);
		gulp.watch('./dist/' + domain.title + '/**/*.css',
			notifyLiveReload);
		if(project_config.workflow.reloadjs) {
			gulp.watch('./dist/' + domain.title + '/**/*.js',
				notifyLiveReload);
		}
	});

	// gulp.watch(settings.api.src + "/**/*", function(files, cb) {
	// 	return gulp.start("restart-api-server");
	// });
		
})



function notifyLiveReload(event) {
	var fileName = path.relative(__dirname, event.path);
	lrserver.changed(fileName);
	console.log(event.toString());
}



gulp.task('default', watchDomainTasks, function() {
	// place code for your default task here
});
