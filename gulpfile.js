var gulp = require('gulp');
var ts = require('gulp-typescript');


/* Backend */

var tsSrc = './src/backend/**/*.ts';

gulp.task('backend:compile:ts', function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src(tsSrc)
        .pipe(tsProject());
    return tsResult.js.pipe(
        gulp.dest('./dist')
    );
});

gulp.task("views:copy", function () {
    gulp.src("./src/backend/views/**/*")
        .pipe(gulp.dest("./dist/views"));
});

gulp.task("default", ["backend:compile:ts", "views:copy"]);
