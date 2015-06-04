var server = require('gulp-express');
var path = require('path');
var sass = require('gulp-sass');
var rootPath = '../',
  serverPath = path.join(rootPath, 'server'),
  sourcePath = path.join(rootPath, 'public/src'),
  modelFile = path.join(serverPath, 'model', '*.js'),
  sockseFile = path.join(serverPath, 'socket', '*.js'),
  appFile = path.join(rootPath, 'app.js'),
  utilsFile = path.join(sourcePath, 'utils', '**/*.js'),
  startPath = path.join(rootPath, 'bin/www');
var filePath = {
  'slides': {
    jsFile: [path.join(sourcePath, 'slides/app', '**/*.js')],
    rootPath: [path.join(__dirname, sourcePath, 'slides')],
    sassFile: [path.join(sourcePath, 'slides/sass', '**/*.scss')],
    buildSassFile: [path.join(sourcePath, 'slides/sass/style.scss')],
    cssFile: [path.join(sourcePath, 'slides/css', 'style.css')],
    cssPath: path.join(sourcePath, 'slides/css/'),
    assetFile: [path.join(sourcePath, 'slides/asset', '*.*')],
    htmlFile: [path.join(sourcePath, 'slides/index.html')],
  },
  'control': {
    jsFile: [path.join(sourcePath, 'control/app', '**/*.js'), path.join(sourcePath, 'control/app', '**/*.jsx')],
    rootPath: [path.join(__dirname, sourcePath, 'control')],
    sassFile: [path.join(sourcePath, 'control/sass', '**/*.scss')],
    buildSassFile: [path.join(sourcePath, 'control/sass/style.scss')],
    cssFile: [path.join(sourcePath, 'control/css', 'style.css')],
    cssPath: path.join(sourcePath, 'control/css/'),
    assetFile: [path.join(sourcePath, 'control/asset', '*.*')],
    htmlFile: [path.join(sourcePath, 'control/index.html')],
  }
};
module.exports = function (gulp) {
  function getPageName(pagePath) {
    for (var key in filePath) {
      if (pagePath.indexOf(filePath[key].rootPath[0]) !== -1) {
        return key;
      }
    }
    return 'all';
  }

  function reload(htmlFile) {
    htmlFile.forEach(function (value) {
      var event = {
        type: 'changed',
        path: value
      };
      server.notify(event);
    });
  }

  function resass(sassFile, cssPath) {
    for (var i = 0; i < sassFile.length; i++) {
      gulp.src(sassFile[i]).pipe(sass({
            errLogToConsole: true
        })).pipe(gulp.dest(cssPath));
    }
  }

  function registerFilePath(filePath) {
    var allPath = {}, temp, value;
    for (var page in filePath) {
      for (var key in filePath[page]) {
        temp = allPath[key];
        value = filePath[page][key];
        allPath[key] = temp ? temp.concat(value) : value;
      }
    }
    filePath['all'] = allPath;
  }
  gulp.task('server', function () {
    server.run([startPath]);
    taskFilePath = filePath['all'];
    reloadFiles = [].concat(utilsFile, taskFilePath.htmlFile, taskFilePath.cssFile, taskFilePath.assetFile, taskFilePath.jsFile)
    gulp.watch(reloadFiles, function (evt) {
      var key = getPageName(evt.path),
        htmlFile = filePath[key].htmlFile;
      reload(htmlFile);
    });
    gulp.watch([taskFilePath.sassFile], function (evt) {
      var key = getPageName(evt.path),
        sassFile = filePath[key].buildSassFile,
        cssPath = filePath[key].cssPath;
      resass(sassFile, cssPath);
    });
    gulp.watch([modelFile, appFile, sockseFile], function (evt) {
      server.stop()
      server.run([startPath]);
      reload(taskFilePath.htmlFile);
    });
  });
  registerFilePath(filePath);
  gulp.task('default', ['server']);
  gulp.task('buildSass', function(){
    gulp.src('../public/src/slides/sass/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('../public/src/slides/css/'));
  });
}