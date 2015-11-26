'use strict';
var gulp     = require('gulp'),
    header   = require('gulp-header'),
    jshint   = require('gulp-jshint'),
    rename   = require('gulp-rename'),
    eslint   = require('gulp-eslint'),
    ava      = require('gulp-ava'),
    uglify   = require('gulp-uglify');

var pkg = require('./package.json'),
    banner = ['/**',
              ' * <%= pkg.name %> - <%= pkg.description %>',
              ' * @version v<%= pkg.version %>',
              ' * @author <%= pkg.author %>',
              ' * @link <%= pkg.homepage %>',
              ' * @license <%= pkg.license %>',
              ' */',
              ''].join('\n');

gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['src/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('test', function () {
    return gulp.src('test/*.js')
        // gulp-ava needs filepaths so you can't have any plugins before it
        .pipe(ava());
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

gulp.task('default', ['lint', 'test', 'build']);
