var path = require('path');

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var jeditor = require("gulp-json-editor");

var package = require('./package.json');

gulp.task('default', function () {
  gulp.src('./src/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./ext/content'));

  gulp.src("./src/manifest.json")
    .pipe(jeditor({
        'name': package.name,
        'version': package.version,
        'description': package.description,
        'homepage_url': package.repository.url
    }))
    .pipe(gulp.dest("./ext"));
});
