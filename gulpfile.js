const gulp = require('gulp');
const connect = require('gulp-connect');
const debug = require('gulp-debug');
const concat = require('gulp-concat');
const argv = require('yargs').argv;

const livereload = argv.livereload === true;

console.log('livereload', livereload);

gulp.task('server', function () {
    connect.server({
        root: ['bin'],
        port: 4242,
        livereload: livereload
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
    gulp.watch(
        ['./src/**/*', './src/bower_components/**/*.js'],
        livereload ? ['build_dynamic', 'reload']: ['build_dynamic']
    )
});

gulp.task('build_dynamic', ['js', 'html', 'css', 'lib']);
gulp.task('default', ['lib', 'build_dynamic', 'server', 'watch']);
