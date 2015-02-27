var fs         = require('fs');
var jade       = require('gulp-jade');
var concatJST  = require('gulp-jade-jst-concat');
var chmod      = require('gulp-chmod');
var notify     = require('gulp-notify');

/*************************************************
 PROCESS DYNAMIC TEMPLATES
 *************************************************/
 
module.exports = function(gulp, pubsub) {
	this.init = function(domain) { }

	this.run = function(domain, languages) {
		var src = ["./src/" + domain.title + "/jade/dynamic/**/*.jade", "!" + "./src/" + domain.title + "/jade/dynamic/**/_*.jade"];
		var dest = "./src/" + domain.title;
		return gulp.src(src)
			.pipe(jade({
				client: true
			}))
			.on('error', notify.onError(function (error) {
			    return 'An error occurred while compiling jade.\nLook in the Command Line for details.\n' + error;
			}))
			.pipe(concatJST('templates.js', {
				basepath: "./src/" + domain.title + "/jade/dynamic"
			}))
			.pipe(gulp.dest("./src/" + domain.title + "/js"));
	}

	this.watch = function(domain_title) {
		gulp.watch(["./src/" + domain_title + "/jade/dynamic/*.jade"], [domain_title+'-templates']);
	}

}