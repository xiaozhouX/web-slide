// var gulp = require('gulp');
// var webserver = require('gulp-webserver'),
//     sass = require('gulp-sass');
// gulp.task('webserver', function() {
//   // process.chdir('../src');
//   gulp.src('../src')
//     .pipe(webserver({
//       livereload: {
//         enable: true, // need this set to true to enable livereload
//         filter: function(fileName) {
//           if (fileName.match(/.scss$/)) { // exclude all source maps from livereload
//             return false;
//           } else {
//             return true;
//           }
//         },
//       },
//       // directoryListing: true,
//       open: 'index.html'
//     }));
// });

// gulp.task('default', ['sass', 'webserver'], function(){
//   // webserver();
//   gulp.watch(['../src/sass/**'], ['sass']);
// });

var gulp = require('gulp');
var server = require('gulp-express');
var path = require('path');
var sass = require('gulp-sass');

var sourcePath = '../src',
    modelFile = path.join(sourcePath, 'model', '*.js'),
    sockseFile = path.join(sourcePath, 'socket', '*.js'),
    appFile = path.join(sourcePath, 'app.js'),
    publicPath = path.join(sourcePath, 'public'),
    startPath = path.join(publicPath, 'bin/www');

var filePath = {
  'slides': {
    jsFile: [path.join(publicPath, 'slides/app', '**/*.js'), path.join(publicPath, 'slides/utils', '**/*.js')],
    sassFile: path.join(publicPath, 'slides/sass', '**/*.scss'),
    cssFile: path.join(publicPath, 'slides/css', 'style.css'),
    cssPath: path.join(publicPath, 'slides/css/'),
    assetFile: path.join(publicPath, 'slides/asset', '*.*'),
    htmlFile: path.join(publicPath, 'slides/index.html'),
  },
  'control': {
    jsFile: [path.join(publicPath, 'control/app', '**/*.js'), path.join(publicPath, 'control/utils', '**/*.js')],
    sassFile: path.join(publicPath, 'control/sass', '**/*.scss'),
    cssFile: path.join(publicPath, 'control/css', 'style.css'),
    cssPath: path.join(publicPath, 'control/css/'),
    assetFile: path.join(publicPath, 'control/asset', '*.*'),
    htmlFile: path.join(publicPath, 'control/index.html'),
  }
};

function reload(htmlFile){
  htmlFile.forEach(function(value){
    var event = {
      type: 'changed',
      path: slidesHtmlFile
    };
    server.notify(event);
  });
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
    // Start the server at the beginning of the task
    server.run(startPath);
    // Restart the server when file changes
    reloadFiles = [].concat(taskFilePath.htmlFile, taskFilePath.cssFile, taskFilePath.assetFile, taskFilePath.jsFile)
    console.log(reloadFiles);
    gulp.watch(reloadFiles, function(){
      reload(taskFilePath.htmlFile);
    });
    // gulp.watch(['app/styles/**/*.scss'], ['styles:scss']);
    // //gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]);
    // //Event object won't pass down to gulp.watch's callback if there's more than one of them.
    // //So the correct way to use server.notify is as following:
    gulp.watch([taskFilePath.sassFile], ['sass']);

    // gulp.watch(['app/scripts/**/*.js'], ['jshint']);
    // gulp.watch(['app/images/**/*'], server.notify);
    gulp.watch([modelFile, appFile, sockseFile], [server.run]);
  });
}


registerServer();
var page = ['slides', 'control'];
for(var i = 0, l = page.length; i < l; i++) {
  registerServer(page[i]);
}

gulp.task('sass', function () {
    gulp.src(sassFile)
        .pipe(sass())
        .pipe(gulp.dest(cssPath));
});
gulp.task('default', ['server']);