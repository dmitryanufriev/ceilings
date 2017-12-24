var gulp = require("gulp");
var gulp_tslint = require("gulp-tslint");
var ts = require("gulp-typescript");
var less = require("gulp-less");
var minifyCSS = require("gulp-minify-css");
var rename = require("gulp-rename");
var LessAutoprefix = require("less-plugin-autoprefix");

var autoprefix = new LessAutoprefix({ browsers: ["last 2 versions"] });

/* Backend */

var tsSrc = "./src/backend/**/*.ts";

gulp.task("backend:lint:ts", function() {
    return gulp
        .src(tsSrc)
        .pipe(gulp_tslint())
        .pipe(gulp_tslint.report());
});

gulp.task("backend:compile:ts", function() {
    var tsProject = ts.createProject("tsconfig.json");
    var tsResult = gulp.src(tsSrc).pipe(tsProject());
    return tsResult.js.pipe(gulp.dest("./dist"));
});

gulp.task("backend:views:copy", function() {
    gulp.src("./src/backend/views/**/*").pipe(gulp.dest("./dist/views"));
});

/* Frontend */

gulp.task("frontend:compile:less", function() {
    gulp
        .src("./src/frontend/styles/styles.less")
        .pipe(
            less({
                plugins: [autoprefix]
            })
        )
        .pipe(minifyCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("./dist/public/styles"));
});

gulp.task("frontend:font:copy", function() {
    gulp.src("./src/frontend/font/*").pipe(gulp.dest("./dist/public/font"));
});

gulp.task("frontend:font:styles:copy", function() {
    gulp
        .src("./src/frontend/styles/font/*")
        .pipe(gulp.dest("./dist/public/styles"));
});

gulp.task("frontend:images:copy", function() {
    gulp
        .src("./src/frontend/images/**/*")
        .pipe(gulp.dest("./dist/public/images"));
});

gulp.task("default", [
    "backend:lint:ts",
    "backend:compile:ts",
    "backend:views:copy",
    "frontend:compile:less",
    "frontend:font:copy",
    "frontend:font:styles:copy",
    "frontend:images:copy"
]);
