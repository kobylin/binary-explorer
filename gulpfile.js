var gulp = require('gulp');
var connect = require('gulp-connect');
var debug = require('gulp-debug');

gulp.task('server', function() {
    connect.server({
        root: ['www'],
        port: 4242,
        livereload: true
    })
});

gulp.task('project_files', function () {
    gulp.src([
        './www/**/*'
    ]).pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./www/**/*'], ['project_files'])
});

gulp.task('default', ['server', 'watch']);