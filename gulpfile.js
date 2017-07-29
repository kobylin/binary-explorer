var gulp = require('gulp');
var connect = require('gulp-connect');
var debug = require('gulp-debug');
var concat = require('gulp-concat');

gulp.task('server', function () {
    connect.server({
        root: ['bin'],
        port: 4242,
        livereload: true
    })
});

gulp.task('reload', function () {
    gulp.src(['./bin/**/*'])
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src([
        './src/app.js',
        './src/**/*.js',
        '!./src/bower_components/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./bin'));
});

gulp.task('lib', function () {
    gulp.src([
        './src/bower_components/**/*'], {base: './src'})
        .pipe(gulp.dest('./bin'));
});

gulp.task('html', function () {
    gulp.src(['./src/**/*.html'], {base: './src'})
        .pipe(gulp.dest('./bin'));
});

gulp.task('css', function () {
    gulp.src(['./src/css/**/*.css', './src/components/**/*.css'])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./bin/css'));
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*', './src/bower_components/**/*.js'], ['build_dynamic', 'reload'])
});

gulp.task('build_dynamic', ['js', 'html', 'css', 'lib']);
gulp.task('default', ['lib', 'build_dynamic', 'server', 'watch']);
