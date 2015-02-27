var browserify = require('browserify');
var plumber = require('gulp-plumber');
var streamify = require('gulp-streamify');
var source     = require('vinyl-source-stream');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');
var run = require('run-sequence');
var notify     = require('gulp-notify');

/*************************************************
 PROCESS STYLES
 *************************************************/

module.exports = function(gulp, pubsub) {
	this.init = function(domain) {
		// pubsub.subscribe(domain.title+"-templates", function() {
		//     run([domain.title+'-scripts']);
		// });
	}

	this.run = function(domain, languages) {
		var src = "./src/" + domain.title + '/js/index.js';
		var dest = "./dist/" + domain.title ;

		return gulp.src(src, {read:false})
			.pipe(plumber())
			.pipe( browserify({ debug:true })
				.add(src)
				.bundle()
				// .on('error', function(err){
				// 	console.log("Error in browserify");
				// 	console.log(err.message);
				// 	this.emit("end");
				// })
				.on('error', notify.onError(function (error) {
				    return 'An error occurred in Browserify.\nLook in the Command Line for details.\n' + error.message;
				}))
			)
			.pipe(source(src))
			.pipe(rename("index.js"))
			.pipe(gulp.dest(dest))
			.pipe(streamify(uglify()))
			.pipe(rename("index.min.js"))
			.pipe(gulp.dest(dest))
	}

	this.watch = function(domain_title) {
		gulp.watch(["./src/" + domain_title + "/js/**/*.js"], [domain_title+'-scripts']);
	}
 
}