'use strict';
var gulp     = require('gulp'),
    mocha    = require('gulp-mocha'),
    header   = require('gulp-header'),
    jshint   = require('gulp-jshint'),
    rename   = require('gulp-rename'),
    uglify   = require('gulp-uglify'),
    istanbul = require('gulp-istanbul');

var pkg = require('./package.json'),
    banner = ['/**',
              ' * <%= pkg.name %> - <%= pkg.description %>',
              ' * @version v<%= pkg.version %>',
              ' * @author <%= pkg.author %>',
              ' * @link <%= pkg.homepage %>',
              ' * @license <%= pkg.license %>',
              ' */',
              ''].join('\n');

gulp.task('jshint', function () {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build', function () {
    return gulp.src('src/*.js')
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('mocha', function (cb) {
    gulp.src('src/*.js')
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['tests/*.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .on('end', cb);
        });
});


gulp.task('tests', ['jshint', 'mocha']);
gulp.task('default', ['jshint', 'mocha', 'build']);
