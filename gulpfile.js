// Gulpfile
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var jsSources = ['scripts/*.js'],
    sassSources = ['styles/*.scss'],
    htmlSources = ['../*.html'],
    cssOutput = 'assets/css/',
	jsOutput = 'assets/js/';

gulp.task('sass', function() {
  gulp.src(sassSources)
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(concat('main.css'))
  .pipe(gulp.dest(cssOutput))
  .pipe(connect.reload())
});

gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(uglify())
  .pipe(concat('core.js'))
  .pipe(gulp.dest(jsOutput))
  .pipe(connect.reload())
});

gulp.task('connect', function() {
  connect.server({
    root: 'master',
    livereload: true
  })
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(connect.reload())
});

gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);