var path = require('path');

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var jeditor = require("gulp-json-editor");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var imageminOptipng = require('imagemin-optipng');
var mainBowerFiles = require('main-bower-files');

var packageJson = require('./package.json');

gulp.task('watch', function() {
  gulp.watch('./src/**/*', ['default']);
});

gulp.task('styles', function() {
  gulp.src('./src/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./ext/content'));
});

gulp.task('scripts', function() {
  gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./ext/content'));
  
  gulp.src('./src/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./ext/content'));
});

gulp.task('images', function() {
  gulp.src('./src/icons/*.png')
    .pipe(imageminOptipng({optimizationLevel: 3})())
    .pipe(gulp.dest('./ext/icons'));
});

gulp.task('manifest', function() {
  var options = {
    'name': packageJson.name,
    'version': packageJson.version,
    'description': packageJson.description,
    'homepage_url': packageJson.repository.url
  };

  gulp.src("./src/manifest.json")
    .pipe(jeditor(options))
    .pipe(gulp.dest("./ext"));
});

gulp.task('default', ['styles', 'scripts', 'images', 'manifest'])
