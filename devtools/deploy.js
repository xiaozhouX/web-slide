module.exports = function(gulp){
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
      baseDeployPath = './build',
      slidesPath = path.join(basePath, 'slides/'),
      controlPath = path.join(basePath, 'control/'),
      slidesDeployPath = path.join(baseDeployPath, 'slides/'),
      controlDeployPath = path.join(baseDeployPath, 'control/'),
      slidesRequireConfig = require('./deploy/slidesRC'),
      controlRequireConfig = require('./deploy/controlRC');
      slidesRequireConfig.baseUrl = slidesPath;
      controlRequireConfig.baseUrl = controlPath;
  var buildPath = slidesPath,
      deployPath = slidesDeployPath,
      requireConfig = slidesRequireConfig;

  gulp.task('buildHtml', function() {
    gulp.src(path.join(buildPath, 'index.html'))
      .pipe(htmlreplace({
        js: ['app/require.min.js', 'app/main.min.js'],
        css: 'css/style.min.css',
        livereload: ''
      }))
      .pipe(gulp.dest(deployPath));
  });


  gulp.task('uglifycss', function () {
    gulp.src(path.join(buildPath + 'css/style.css'))
      .pipe(uglifycss({
        "max-line-len": 80
      }))
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest(path.join(deployPath, 'css')));
  });

  gulp.task('requirejsBuild', function() {
      rjs(requireConfig)
      .pipe(uglify())
      .pipe(rename('main.min.js'))
      .pipe(gulp.dest(path.join(deployPath, 'app'))); // pipe it to the output DIR
  });
  gulp.task('delete', function(callback) {
    del((deployPath), callback);
  });
  gulp.task('copy', function(callback) {
    gulp.src(path.join(buildPath, 'asset/**.**'))
      .pipe(gulp.dest(path.join(deployPath, 'asset')));
  });
  gulp.task('jsFile', function() {
    gulp.src([path.join(buildPath, 'lib/require.js')])
    .pipe(rename('require.min.js'))
    .pipe(gulp.dest(path.join(deployPath, 'app'))); // pipe it to the output DIR
  });

  gulp.task('build', function(callback) {
    runSequence('delete',
                'buildSlides',
                'buildControl',
                callback);
  });

  gulp.task('package', function(callback) {
    runSequence('jsFile',
                'requirejsBuild',
                'uglifycss',
                'buildHtml',
                'copy',
                callback);
  });

  gulp.task('buildSlides', function(callback) {
    buildPath = slidesPath,
    deployPath = slidesDeployPath;
    requireConfig = slidesRequireConfig;
    runSequence('package', callback);
    console.log('build slides');
  });

  gulp.task('buildControl', function(callback) {
    buildPath = controlPath,
    deployPath = controlDeployPath;
    requireConfig = controlRequireConfig;
    runSequence('package', callback);
    console.log('build control');
  });
}