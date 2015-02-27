var fs         = require('fs');
var jade       = require('gulp-jade');
var concatJST  = require('gulp-jade-jst-concat');
var chmod      = require('gulp-chmod');
var notify     = require('gulp-notify');

/*************************************************
 PROCESS STATIC JADE TEMPLATES
 *************************************************/
 
module.exports = function(gulp, pubsub) {
	this.init = function(domain) { }

	this.run = function(domain, languages) {
		for (var i in languages) {
			var lang = languages[i];
			var DATA = JSON.parse(fs.readFileSync("./src/" + domain.title + "/data/_compiled/" + lang + ".json", "utf-8"));
			var src = ["./src/" + domain.title + "/jade/static/*.jade", "!" + "./src/" + domain.title + "/jade/static/_*.jade"];
			var dest = "./dist/" + domain.title + "/" + lang;
			if(i==languages.length-1) {
				return gulp.src(src)
					.pipe(jade({
						locals: DATA
					}))
					.on('error', notify.onError(function (error) {
					    return 'An error occurred while compiling jade.\nLook in the Command Line for details.\n' + error;
					}))
					.pipe(chmod(755))
					.pipe(gulp.dest(dest));
			} else {
				gulp.src(src)
					.pipe(jade({
						locals: DATA
					}))
					.on('error', notify.onError(function (error) {
					    return 'An error occurred while compiling jade.\nLook in the Command Line for details.\n' + error;
					}))
					.pipe(chmod(755))
					.pipe(gulp.dest(dest));
			}
			
		}
	}

	this.watch = function(domain_title) {
		gulp.watch(["./src/" + domain_title + "/jade/static/*.jade"], [domain_title+'-statics']);
	}
}