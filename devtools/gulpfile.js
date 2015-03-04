var gulp = require('gulp');
var server = require('gulp-express');
var path = require('path');
var sass = require('gulp-sass');

var sourcePath = '../src',
    modelFile = path.join(sourcePath, 'model', '*.js'),
    sockseFile = path.join(sourcePath, 'socket', '*.js'),
    appFile = path.join(sourcePath, 'app.js'),
    publicPath = path.join(sourcePath, 'public'),
    startPath = path.join(sourcePath, 'bin/www');

var filePath = {
  'slides': {
    jsFile: [path.join(publicPath, 'slides/app', '**/*.js'), path.join(publicPath, 'slides/utils', '**/*.js')],
    sassFile: [path.join(publicPath, 'slides/sass', '**/*.scss')],
    cssFile: [path.join(publicPath, 'slides/css', 'style.css')],
    cssPath: [path.join(publicPath, 'slides/css/')],
    assetFile: [path.join(publicPath, 'slides/asset', '*.*')],
    htmlFile: [path.join(publicPath, 'slides/index.html')],
  },
  'control': {
    jsFile: [path.join(publicPath, 'control/app', '**/*.js'), path.join(publicPath, 'control/utils', '**/*.js')],
    sassFile: [path.join(publicPath, 'control/sass', '**/*.scss')],
    cssFile: [path.join(publicPath, 'control/css', 'style.css')],
    cssPath: [path.join(publicPath, 'control/css/')],
    assetFile: [path.join(publicPath, 'control/asset', '*.*')],
    htmlFile: [path.join(publicPath, 'control/index.html')],
  }
};

function reload(htmlFile){
  htmlFile.forEach(function(value){
    var event = {
      type: 'changed',
      path: value
    };
    server.notify(event);
  });
}

function resass(sassFile, cssPath) {
  for(var i = 0; i < sassFile.length; i++ ){
    gulp.src(sassFile[i])
        .pipe(sass())
        .pipe(gulp.dest(cssPath[i]));
  }
}

function registerServer(pageName) {
  var taskFilePath, taskName, reloadFiles, temp, value;
  if(pageName) {
    taskName = '-' + pageName;
    taskFilePath = filePath[pageName];
  }else {
    taskName = '';
    taskFilePath = {};
    for(var page in filePath) {
      for(var key in filePath[page]) {
        temp = taskFilePath[key];
        value = filePath[page][key];
        taskFilePath[key] = temp ? temp.concat(value) : value;
      }
    }
  }
  gulp.task('server' + taskName, function () {
    server.run([startPath]);
    reloadFiles = [].concat(taskFilePath.htmlFile, taskFilePath.cssFile, taskFilePath.assetFile, taskFilePath.jsFile)
    gulp.watch(reloadFiles, function(){
      reload(taskFilePath.htmlFile);
    });
    gulp.watch([taskFilePath.sassFile], function(){
      resass(taskFilePath.sassFile, taskFilePath.cssPath);
    });
    gulp.watch([modelFile, appFile, sockseFile], function(){
      reload(taskFilePath.htmlFile);
      server.stop()
      server.run([startPath]);
    });
  });
}


registerServer();
var page = ['slides', 'control'];
for(var i = 0, l = page.length; i < l; i++) {
  registerServer(page[i]);
}

gulp.task('default', ['server']);