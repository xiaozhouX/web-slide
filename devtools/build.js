  var rjs = require('gulp-requirejs');
  var uglifycss = require('gulp-uglifycss');
  var uglify = require('gulp-uglify');
  var concat = require('gulp-concat');
  var runSequence = require('run-sequence');
  var rename = require('gulp-rename');
  var del = require('del');
  var htmlreplace = require('gulp-html-replace');
  var path = require('path');
  var basePath = '../public/src/',
    baseBuildPath = './build',
    slidesPath = path.join(basePath, 'slides/'),
    controlPath = path.join(basePath, 'control/'),
    slidesBuildPath = path.join(baseBuildPath, 'slides/'),
    controlBuildPath = path.join(baseBuildPath, 'control/'),
    slidesRequireConfig = require('./config/slidesRC'),
    controlRequireConfig = require('./config/controlRC');
    slidesRequireConfig.baseUrl = slidesPath;
  controlRequireConfig.baseUrl = controlPath;
  var filePath = slidesPath,
    buildPath = slidesBuildPath,
    requireConfig = slidesRequireConfig;
  module.exports = function (gulp) {
    gulp.task('buildHtml', function () {
      gulp.src(path.join(filePath, 'index.html')).pipe(htmlreplace({
        js: ['app/require.min.js', 'app/main.min.js'],
        css: 'css/style.min.css',
        livereload: ''
      })).pipe(gulp.dest(buildPath));
    });
    gulp.task('uglifycss', function () {
      gulp.src(path.join(filePath + 'css/style.css')).pipe(uglifycss({
        "max-line-len": 80
      })).pipe(rename('style.min.css')).pipe(gulp.dest(path.join(buildPath, 'css')));
    });
    gulp.task('requirejsBuild', function () {
      rjs(requireConfig).pipe(uglify()).pipe(rename('main.min.js')).pipe(gulp.dest(path.join(buildPath, 'app'))); // pipe it to the output DIR
    });
    gulp.task('delete', function (callback) {
      del((buildPath), callback);
    });
    gulp.task('copy', function (callback) {
      gulp.src(path.join(filePath, 'asset/**.**')).pipe(gulp.dest(path.join(buildPath, 'asset')));
    });
    gulp.task('jsFile', function () {
      gulp.src([path.join(filePath, 'lib/require.js')]).pipe(rename('require.min.js')).pipe(gulp.dest(path.join(buildPath, 'app'))); // pipe it to the output DIR
    });
    gulp.task('build', function (callback) {
      runSequence('delete', 'buildSlides', 'buildControl', callback);
    });
    gulp.task('package', function (callback) {
      runSequence('jsFile', 'requirejsBuild', 'uglifycss', 'buildHtml', 'copy', callback);
      console.log(buildPath);
    });
    gulp.task('buildSlides', function (callback) {
      filePath = slidesPath,
      buildPath = slidesBuildPath;
      requireConfig = slidesRequireConfig;
      runSequence('package', callback);
      console.log('build slides');
    });
    gulp.task('buildControl', function (callback) {
      filePath = controlPath,
      buildPath = controlBuildPath;
      requireConfig = controlRequireConfig;
      runSequence('package', callback);
      console.log('build control');
    });
  }