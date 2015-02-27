var sass       = require('gulp-sass');

/*************************************************
 PROCESS SASS
 *************************************************/

module.exports = function(gulp, pubsub) {
	this.init = function(domain) { }

	this.run = function(domain, languages) {
	    var src = "./src/" + domain.title + '/sass/**/*.sass';
	    var dest = "./dist/" + domain.title ;

	    return gulp.src(src)
	        .pipe(sass({
	            sourceComments: 'normal'
	        }))
	        .pipe(gulp.dest(dest));
    }

    this.watch = function(domain_title) {
		gulp.watch(["./src/" + domain_title + "/sass/**/*.scss"], [domain_title+'-styles']);
	}
}

