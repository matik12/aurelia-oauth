var gulp = require('gulp');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var paths = require('../paths');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var typescript = require('gulp-typescript');
var tsc = require('typescript');
var merge = require('merge2');

var tsProjectES6 = typescript.createProject('./tsconfig.json', { typescript: tsc });
var tsProjectAMD = typescript.createProject('./tsconfig.json', { typescript: tsc, target: 'es5', module: 'amd' });
var tsProjectCJS = typescript.createProject('./tsconfig.json', { typescript: tsc, target: 'es5', module: 'commonjs' });
var tsProjectSystem = typescript.createProject('./tsconfig.json', { typescript: tsc, target: 'es5', module: 'system', declaration: true });

function buildFromTs(tsProject, outputPath, includeEs6Dts) {
    var src = paths.dtsSrc.concat(paths.source);
    var tsResult = gulp.src(src)
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))    
        .pipe(changed(outputPath, {extension: '.js'}))
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest(paths.output + 'dts')),
        tsResult.js.pipe(sourcemaps.write({includeContent: true}))
            .pipe(gulp.dest(outputPath))
    ]);
}

gulp.task('build-html-ts', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'ts'));
});

gulp.task('build-ts', ['build-html-ts'], function() {
    return gulp.src(paths.source)
    .pipe(gulp.dest(paths.output + 'ts'));
});

gulp.task('build-html-es6', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-es6', ['build-html-es6'], function () {
    return buildFromTs(tsProjectES6, paths.output + 'es6', false);
});

gulp.task('build-html-commonjs', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-commonjs', ['build-html-commonjs'], function () {
    return buildFromTs(tsProjectCJS, paths.output + 'commonjs', true);
});

gulp.task('build-html-amd', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-amd', ['build-html-amd'], function () {
    return buildFromTs(tsProjectAMD, paths.output + 'amd', true);
});

gulp.task('build-html-system', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-system', ['build-html-system'], function () {
    return buildFromTs(tsProjectSystem, paths.output + 'system', true);
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    'lint',
    ['build-ts', 'build-es6', 'build-commonjs', 'build-amd', 'build-system'],
    callback
  );
});
