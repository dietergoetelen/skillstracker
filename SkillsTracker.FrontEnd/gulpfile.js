var gulp = require('gulp'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	express = require('express');

var bases = {
	dist: 'dist',
	src: 'src'
};

var config = {
	jsFiles: [bases.src +'/app/*.js',bases.src +'/app/*/*.js', bases.src +'/app/*/*/*.js'],
	libs: [bases.src +'/js/angular.js', bases.src +'/js/ui-router.js'],
	less: [bases.src + '/less/*.less', bases.src + '/less/*/*.less'],
	html: ['**/*.html']
};

gulp.task('js', function () {
	
	gulp.src(config.jsFiles)
		.pipe(concat('main.js'))
		.pipe(ngAnnotate())
		.pipe(gulp.dest('./dist/js'));
	
});

gulp.task('less', function () {
	
	gulp.src(bases.src +'/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('./' + bases.dist + '/css'));
	
});

gulp.task('copy', function () {
	gulp.src(config.html, { cwd: bases.src })
		.pipe(gulp.dest(bases.dist));
});

gulp.task('libs', function () {
	
	gulp.src(config.libs)
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./' + bases.dist + '/js'));
	
});

gulp.task('develop', ['libs', 'copy', 'less', 'js'], function () {
	
	gulp.watch(config.jsFiles, ['js']);
	gulp.watch(config.less, ['less']);
	
	startExpress();
	
});

function startExpress() {
	var app = express();

	app.use(express.static(__dirname + '/src'));
	
	app.get('/', function (req, res) {
		res.sendFile('dist/index.html', {root: __dirname});
	});
	
	app.listen(5000, function () {
		console.log('server running on port :5000');
	});
}