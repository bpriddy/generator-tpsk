var joinData   = require('gulp-join-data');
var print = require('gulp-print');

/*************************************************
 PROCESS DATA
 *************************************************/

module.exports = function(gulp, pubsub) {
    this.init = function(domain) { }

    this.run = function(domain, languages) {
        for (var i in languages) {
            var lang = languages[i];
            var src = [
                './src/shared/**/*.json',
                './src/' + domain.title + '/data/' + lang + '/**/*.json',
                './src/' + domain.title + '/data/*.json'
            ];
            var dest = './src/' + domain.title + "/data/_compiled/";

            if(i==languages.length-1) {
                return gulp.src(src)
                    .pipe(joinData({
                        fileName: lang + ".json",
                        dest: dest,
                        bases: [lang, "shared"]
                    }))
                    .pipe(gulp.dest(dest))
                    .pipe(gulp.dest("./dist/" + domain.title + "/" + lang + "/data/"));
            } else {
                gulp.src(src)
                    .pipe(joinData({
                        fileName: lang + ".json",
                        dest: dest,
                        bases: [lang, "shared"]
                    }))
                    .pipe(gulp.dest(dest))
                    .pipe(gulp.dest("./dist/" + domain.title + "/" + lang + "/data/"));
            }
            
        }
        return;
    }
     
    this.watch = function(domain_title) {
        gulp.watch(["./src/" + domain_title + "/data/**/*.*"], [domain_title+'-data']);
    }
}
