var server = require('./server'),
	deploy = require('./deploy'),
	gulp = require('gulp');

server(gulp);
deploy(gulp);