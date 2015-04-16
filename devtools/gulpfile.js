var server = require('./server'),
	build = require('./build'),
	deploy = require('./deploy'),
	gulp = require('gulp');

server(gulp);
build(gulp);
deploy(gulp);