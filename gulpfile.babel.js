'use strict';

import path         from 'path';
import gulp         from 'gulp';
import babelify     from 'babelify';
import browserify   from 'browserify';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import plumber      from 'gulp-plumber';
import uglify       from 'gulp-uglify';
import sourcemaps   from 'gulp-sourcemaps';
import stylus       from 'gulp-stylus';
import htmlmin      from 'gulp-htmlmin';
import imagemin     from 'gulp-imagemin';
import autoprefixer from 'gulp-autoprefixer';

const dirs = {
	src:        path.join(__dirname, 'src'),
	build:      path.join(__dirname, 'build'),
	js:         path.join(__dirname, 'src', 'js'),
	jsfinal:    path.join(__dirname, 'build', 'js'),
	styl:       path.join(__dirname, 'src', 'styl'),
	stylfinal:  path.join(__dirname, 'build', 'css'),
	maps:       path.join(__dirname, 'build', 'maps'),
	views:      path.join(__dirname, 'src', 'views'),
	viewsfinal: path.join(__dirname, 'build', 'views'),
	img:        path.join(__dirname, 'src', 'img'),
	imgfinal:   path.join(__dirname, 'build', 'img')
};

const deps = [
	'angular',
	'angular-route',
	'angular-sanitize'
];

gulp.task('jsVendor', () => {
	const b = browserify();

	deps.forEach(dep => {
		b.require(dep);
	});

	return b.bundle()
		.on('error', (err) => {
			console.log(err.toString())
		})
		.pipe(plumber())
		.pipe(source('vendor.min.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write(dirs.maps))
		.pipe(gulp.dest(dirs.jsfinal));
});

gulp.task('jsApp', () => {
	return browserify(path.join(dirs.js, 'app.js'))
		.external(deps)
		.transform(babelify)
		.bundle()
		.pipe(plumber())
		.pipe(source('app.min.js'))
		.pipe(buffer())
		.pipe(uglify({ mangle: false }))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write(dirs.maps))
		.pipe(gulp.dest(dirs.jsfinal));
});

gulp.task('stylus', () => {
	return gulp.src(path.join(dirs.styl, 'main.styl'))
	.pipe(plumber())
	.pipe(stylus({
		compress: true
	}))
	.pipe(autoprefixer({ browsers: ['last 2 versions'] }))
	.pipe(gulp.dest(dirs.stylfinal))
});

gulp.task('html', () => {
	return gulp.src(path.join(dirs.views, '**/*.html'))
	.pipe(plumber())
	.pipe(htmlmin({ collapseWhitespace: true }))
	.pipe(gulp.dest(dirs.viewsfinal));
});

gulp.task('imagemin', () => {
  return gulp.src(path.join(dirs.img, '**/*'))
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(dirs.imgfinal));
});

gulp.task('watch', () => {
	gulp.watch(path.join(dirs.js, '**/*.js'), ['jsApp', 'jsVendor']);
	gulp.watch(path.join(dirs.styl, '**/*.styl'), ['stylus']);
	gulp.watch(path.join(dirs.views, '**/*.html'), ['html']);
	gulp.watch(path.join(dirs.img, '**/*'), ['imagemin']);
});

gulp.task('build', ['jsApp', 'jsVendor', 'stylus', 'html', 'imagemin']);

gulp.task('default', ['watch']);