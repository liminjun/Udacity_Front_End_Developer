var gulp = require('gulp');




var connect = require('gulp-connect');


gulp.task('connect-dev', function() {
    connect.server({
        port: 8020
    });
});


gulp.task('default', ['connect-dev']);
