var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Static Server + watching scss/html files
gulp.task('default', function () {
    browserSync.init({
        notify: false,
        server: "./"
    });
});

gulp.watch("*.html").on("change", reload);