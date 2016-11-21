'use strict';

import path        from 'path';
import gulp        from 'gulp';
import babelify    from 'babelify';
import browserify  from 'browserify';
import source      from 'vinyl-source-stream';
import buffer      from 'vinyl-buffer';
import plumber     from 'gulp-plumber';
import uglify      from 'gulp-uglify';
import sourcemaps  from 'gulp-sourcemaps';
import stylus      from 'gulp-stylus';

const dirs = {
	src: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'build'),
	js: path.join(__dirname, 'src', 'js'),
	jsfinal: path.join(__dirname, 'build', 'js'),
	styl: path.join(__dirname, 'src', 'styl'),
	stylfinal: path.join(__dirname, 'build', 'css'),
	maps: path.join(__dirname, 'build', 'maps')
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
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write(dirs.maps))
		.pipe(gulp.dest(dirs.jsfinal));
});

gulp.task('jsApp', () => {
	return browserify(path.join(dirs.js, 'angular','app.js'))
	// return browserify(path.join(dirs.js, 'main.js'))
		.external(deps)
		.transform(babelify)
		.bundle()
		.pipe(source('app.min.js'))
		.pipe(plumber())
		.pipe(buffer())
		// .pipe(uglify())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write(dirs.maps))
		.pipe(gulp.dest(dirs.jsfinal));
});

gulp.task('stylus', () => {
	return gulp.src(path.join(dirs.styl, 'main.styl'))
	.pipe(plumber())
	.pipe(stylus({
		compress: true
	}))
	.pipe(gulp.dest(dirs.stylfinal))
});

gulp.task('watch', () => {
	gulp.watch(path.join(dirs.js, '**/*.js'), ['jsApp', 'jsVendor']);
	gulp.watch(path.join(dirs.styl, '**/*.styl'), ['stylus']);
});

gulp.task('build', ['jsApp', 'jsVendor', 'stylus']);

gulp.task('default', ['watch']);