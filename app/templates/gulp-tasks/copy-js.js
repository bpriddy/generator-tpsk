/*************************************************
 PROCESS COPY SCRIPTS
 *************************************************/

module.exports = function(gulp, pubsub) {
	this.init = function(domain) { }

	this.run = function(domain, languages) {
		var src = "./src/" + domain.title + "/scripts/**/*.*";
	    var dest = "./dist/" + domain.title;
	    return gulp.src(src)
	        .pipe(gulp.dest(dest + "/scripts"));
	}

	this.watch = function(domain_title) {
		gulp.watch(["./src/" + domain_title + "/scripts/**/*.*"], [domain_title+'-copy-scripts']);
	}
}