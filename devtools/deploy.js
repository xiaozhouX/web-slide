var gulp = require('gulp');
var gzip = require('gulp-gzip');
var tar = require('gulp-tar');
var gulpSSH = require('gulp-ssh')({
  ignoreErrors: false,
  sshConfig: {
    host: '121.42.211.16',
    port: 22,
    username: 'shelden',
    password: '930628'
  }
});
module.exports = function(gulp){

gulp.task('compass', function() {
    gulp.src('./build/**/**')
    .pipe(tar('build.tar'))
    .pipe(gzip())
    .pipe(gulp.dest('.'));
});

gulp.task('preExec', function () {
  return gulpSSH
    .exec(['cd build/web-slides/public; rm * -rf'], {filePath: 'commands.log'})
    .pipe(gulp.dest('logs'));
});

gulp.task('upload', function () {
  return gulp.src('build.tar.gz')
    .pipe(gulpSSH.sftp('write', 'build.tar.gz'));
});

gulp.task('deployLocal', function () {
  return gulp.src('build/**/*.*').pipe(gulp.dest('../public/build'));
});

// gulp.task('postExec', function () {
//   return gulpSSH
//     .exec(['chmod 777 build.tar.gz', 'cd build/web-slides/public/; tar -xzf build.tar.gz', 'mv -fr build.tar.gz ~/backup'])
//     .pipe(gulp.dest('logs'));
// });

};