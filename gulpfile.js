'use strict';
var gulp   = require('gulp'),
    header = require('gulp-header'),
    jshint = require('gulp-jshint'),
    mocha  = require('gulp-mocha'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

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

gulp.task('mocha', function () {
    return gulp.src('tests/*.js', {
            read: false
        })
        .pipe(mocha({reporter: 'nyan'}));
});


gulp.task('travis', ['jshint', 'mocha']);
gulp.task('default', ['jshint', 'mocha', 'build']);
