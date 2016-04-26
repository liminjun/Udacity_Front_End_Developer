var gulp = require('gulp');


//npm install --save-dev gulp-jshint 
var jshint = require('gulp-jshint');

var connect = require('gulp-connect');


//npm install --save-dev jshint-stylish

//https://github.com/tschortsch/gulp-bootlint
//https://github.com/twbs/bootlint/wiki
//var bootlint = require('gulp-bootlint');



gulp.task('jshint', function () {

    gulp.src(["frontend-nanodegree-resume/js/helper.js","frontend-nanodegree-resume/js/resumeBuilder.js"])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('connect-dev', function() {
    connect.server({
        root: 'frontend-nanodegree-resume',
        port: 8020
    });
});


gulp.task('default', ['connect-dev','jshint']);
