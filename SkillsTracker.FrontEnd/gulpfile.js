var gulp = require('gulp'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	livereload = require('gulp-livereload'),
	express = require('express');

var bases = {
	dist: 'dist',
	src: 'src'
};

var config = {
	jsFiles: [bases.src +'/app/*.js',bases.src +'/app/*/*.js', bases.src +'/app/*/*/*.js'],
	libs: [bases.src +'/js/angular.js', bases.src +'/js/ui-router.js'],
	less: [bases.src + '/less/*.less', bases.src + '/less/*/*.less'],
	html: '**/*.html',
	images: '**/images/*.*',
	fonts: '**/fonts/*.*',
	css: '**/css/*.css'
};

gulp.task('js', function () {
	
	gulp.src(config.jsFiles)
		.pipe(concat('main.js'))
		.pipe(ngAnnotate())
		.pipe(gulp.dest('./' + bases.dist + '/js'));
});

gulp.task('less', function () {
	
	gulp.src(bases.src +'/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('./' + bases.dist + '/css'));
	
});

gulp.task('copy:html', function () {
	gulp.src(config.html, { cwd: bases.src })
		.pipe(gulp.dest(bases.dist));
});

gulp.task('copy:images', function () {
	gulp.src(config.images, { cwd: bases.src })
		.pipe(gulp.dest(bases.dist));
});

gulp.task('copy:fonts', function () {
	gulp.src(config.fonts, { cwd: bases.src })
		.pipe(gulp.dest(bases.dist));
});

gulp.task('copy:css', function () {
	gulp.src(config.css, { cwd: bases.src })
		.pipe(gulp.dest(bases.dist));
});

gulp.task('copy', ['copy:html', 'copy:images', 'copy:fonts']);

gulp.task('libs', function () {
	
	gulp.src(config.libs)
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./' + bases.dist + '/js'));
	
});

gulp.task('develop', ['libs', 'copy', 'less', 'js'], function () {
	var server = livereload();
	gulp.watch(config.jsFiles, ['js']);
	gulp.watch(config.less, ['less']);
	
	startExpress();
	startLivereload();
	
	gulp.watch(bases.dist + '/**').on('change', livereload.changed);
});

function startLivereload() {
	livereload.listen(35729);
}

function startExpress() {
	var app = express();

	app.use(require('connect-livereload')());
	app.use(express.static(__dirname + '/dist'));

	app.listen(5000, function () {
		console.log('server running on port: 5000');
	});
}