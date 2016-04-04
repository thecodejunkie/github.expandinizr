var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var jeditor = require("gulp-json-editor");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var imageminOptipng = require('imagemin-optipng');
var mainBowerFiles = require('main-bower-files');
var cleanHtml = require('gulp-cleanhtml');
var stripDebug = require('gulp-strip-debug');
var zip = require('gulp-zip');

var package = require('./package');
var manifest = require('./src/manifest');

gulp.task('watch', function() {
  return gulp.watch('./src/**', ['default']);
});

gulp.task('clean', function() {
  return gulp.src(['./ext/*', './dist/*'], { read: false })
    .pipe(clean());
})

gulp.task('styles', ['clean'], function() {
  return gulp.src('./src/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./ext/content'));
});

gulp.task('html', ['clean'], function() {
  return gulp.src('./src/*.html')
    .pipe(cleanHtml())
    .pipe(gulp.dest('./ext/content'));
});

gulp.task('scripts', ['clean'], function() {
  gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./ext/content'));

  return gulp.src('./src/*.js')
    .pipe(sourcemaps.init())
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./ext/content'));
});

gulp.task('images', ['clean'], function() {
  return gulp.src('./src/icons/*.png')
    .pipe(imageminOptipng({optimizationLevel: 3})())
    .pipe(gulp.dest('./ext/icons'));
});

gulp.task('manifest', ['clean', 'images', 'scripts', 'html', 'styles'], function() {
  var options = {
    'name': package.name,
    'version': package.version,
    'description': package.description,
    'homepage_url': package.repository.url
  };

  return gulp.src('./src/manifest.json')
    .pipe(jeditor(options))
    .pipe(gulp.dest("./ext"));
});

gulp.task('zip', ['manifest'], function() {
  var manifest = require('./ext/manifest');
  var fileName = manifest.name + ' v' + manifest.version + '.zip';

  return gulp.src('./ext/**')
    .pipe(zip(fileName))
    .pipe(gulp.dest('dist'));
})

gulp.task('dist', ['default', 'zip'])

gulp.task('default', ['manifest'])
