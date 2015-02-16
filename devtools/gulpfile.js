var gulp = require('gulp');
var webserver = require('gulp-webserver'),
    sass = require('gulp-sass');
gulp.task('webserver', function() {
  // process.chdir('../src');
  gulp.src('../src')
    .pipe(webserver({
      livereload: {
        enable: true, // need this set to true to enable livereload
        filter: function(fileName) {
          if (fileName.match(/.scss$/)) { // exclude all source maps from livereload
            return false;
          } else {
            return true;
          }
        },
      },
      // directoryListing: true,
      open: 'index.html'
    }));
});
gulp.task('sass', function () {
    gulp.src('../src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('../src/css'));
});

gulp.task('default', ['sass', 'webserver'], function(){
  // webserver();
  gulp.watch(['../src/sass/**'], ['sass']);
});