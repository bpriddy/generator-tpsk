/*************************************************
 PROCESS COPY
 *************************************************/

module.exports = function(gulp, pubsub) {
	this.init = function(domain) { }

	this.run = function(domain, languages) {
		var src = "./src/" + domain.title + "/assets/**/*.*";
	    var dest = "./dist/" + domain.title;
	    return gulp.src(src)
	        .pipe(gulp.dest(dest + "/assets"));
	}

	this.watch = function(domain_title) {
		gulp.watch(["./src/" + domain_title + "/assets/**/*.*"], [domain_title+'-copy']);
	}
}
