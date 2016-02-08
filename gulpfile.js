var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require("gulp-rename");
var pkg = require('./package.json');
var banner = '/*! <%= pkg.homepage %> | v<%= pkg.version %> | @license <%= pkg.license %> */\n';

gulp.task('build', function() {
    return gulp.src('jquery.queued.events.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));
});