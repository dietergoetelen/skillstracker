var gulp = require('gulp'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	express = require('express');


var config = {
	jsFiles: ['src/app/*.js','src/app/*/*.js', 'src/app/*/*/*.js'],
	libs: ['src/js/angular.js', 'src/js/ui-router.js'],
	less: ['less/*.less', 'less/*/*.less']
};

gulp.task('js', function () {
	
	gulp.src(config.jsFiles)
		.pipe(concat('main.js'))
		.pipe(ngAnnotate())
		.pipe(gulp.dest('./src/js'));
	
});

gulp.task('less', function () {
	
	gulp.src('less/*.less')
		.pipe(less())
		.pipe(gulp.dest('./src/css'));
	
});

gulp.task('libs', function () {
	
	gulp.src(config.libs)
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./src/js'));
	
});

gulp.task('develop', ['libs'], function () {
	
	gulp.watch(config.jsFiles, ['js']);
	gulp.watch(config.less, ['less']);
	
	startExpress();
	
});

function startExpress() {
	var app = express();

	app.use(express.static(__dirname + '/src'));
	
	app.get('/', function (req, res) {
		res.sendFile('src/index.html', {root: __dirname});
	});
	
	app.listen(5000, function () {
		console.log('server running on port :5000');
	});
}