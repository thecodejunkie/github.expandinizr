var gulp = require('gulp')
var less = require('gulp-less')
var clean = require('gulp-clean')
var sourcemaps = require('gulp-sourcemaps')
var jeditor = require('gulp-json-editor')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var cleanCSS = require('gulp-clean-css')
var imagemin = require('gulp-imagemin')
var cleanHtml = require('gulp-cleanhtml')
var stripDebug = require('gulp-strip-debug')
var zip = require('gulp-zip')

var packageInfo = require('./package')

gulp.task('watch', function () {
  return gulp.watch('./src/**', gulp.series('default'))
})

gulp.task('clean', function () {
  return gulp.src(['./ext/*', './dist/*'], { read: false })
    .pipe(clean())
})

gulp.task('styles', function () {
  return gulp.src('./src/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./ext/content'))
})

gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(cleanHtml())
    .pipe(gulp.dest('./ext/content'))
})

gulp.task('scripts', function () {
  var npmAssets = [
    './node_modules/jquery/dist/jquery.min.js'
  ]

  gulp.src(npmAssets).pipe(gulp.dest('./ext/content'))

  return gulp.src('./src/*.js')
    .pipe(sourcemaps.init())
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./ext/content'))
})

gulp.task('images', function () {
  return gulp.src('./src/icons/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('./ext/icons'))
})

gulp.task('manifest', function () {
  var options = {
    'name': packageInfo.name,
    'version': packageInfo.version,
    'description': packageInfo.description,
    'homepage_url': packageInfo.repository.url
  }

  return gulp.src('./src/manifest.json')
    .pipe(jeditor(options))
    .pipe(gulp.dest('./ext'))
})

gulp.task('zip', function () {
  var manifest = require('./ext/manifest')
  var fileName = manifest.name + ' v' + manifest.version + '.zip'

  return gulp.src('./ext/**')
    .pipe(zip(fileName))
    .pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.series('clean', gulp.parallel('images', 'scripts', 'html', 'styles'), 'manifest'))
	
gulp.task('dist', gulp.series('default', 'zip'))
