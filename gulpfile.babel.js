'use strict';

import path       from 'path';
import gulp       from 'gulp';
import babelify   from 'babelify';
import browserify from 'browserify';
import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';
import plumber    from 'gulp-plumber';
import uglify     from 'gulp-uglify';

const dirs = {
	src: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'build'),
	js: path.join(__dirname, 'src', 'js'),
	jsfinal: path.join(__dirname, 'build', 'js'),
	stylus: path.join(__dirname, 'src', 'stylus'),
	stylusfinal: path.join(__dirname, 'build', 'stylus')
};

const deps = [
	'jquery',
	'angular'
];

gulp.task('jsVendor', () => {
	const b = browserify();

	deps.forEach(dep => {
		b.require(dep);
	});

	return b.bundle()
		.pipe(plumber())
		.pipe(source('vendor.min.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(dirs.jsfinal));
});

gulp.task('jsApp', () => {
	return browserify(path.join(dirs.js, 'main.js'))
		.transform(babelify)
		.bundle()
		.pipe(source('app.min.js'))
		.pipe(plumber())
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(dirs.jsfinal));
});

gulp.task('default', ['jsVendor', 'jsApp']);