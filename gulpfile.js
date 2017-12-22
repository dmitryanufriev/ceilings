var gulp = require('gulp');
var ts = require('gulp-typescript');


/* Backend Typescript */

var tsSrc = './src/backend/**/*.ts';

gulp.task('compile:backend:ts', function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src(tsSrc)
        .pipe(tsProject());
    return tsResult.js.pipe(
        gulp.dest('./dist')
    );
});

gulp.task('watch:backend:ts', function () {
    gulp.watch(tsSrc, ['compile:backend:ts']);
});