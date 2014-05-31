var gulp = require('gulp'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

gulp.task('styles', function() {
  var logAndEnd = function(error){
    gutil.beep();
    gutil.log(error);
    this.end();
  }
  return gulp.src('src/less/editorialish.less')
    .pipe(less({paths: [ path.join(__dirname, 'src') ]}))
    .on('error', logAndEnd)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist'));
});

var buildScripts = function(watch) {
  var bundler, rootFile = './src/editorialish.js';
  if (watch) {
    bundler = watchify(rootFile);
  } else {
    bundler = browserify(rootFile);
  }

  bundler.transform(reactify);

  var rebundle = function() {
    var stream = bundler.bundle({debug: false});
    stream = stream.pipe(source('editorialish.js'));
    return stream.pipe(gulp.dest('dist'));
  }
  bundler.on('update', rebundle);
  return rebundle();
}

gulp.task('scripts', function() {
  buildScripts(false);
});

gulp.task('scriptsWatch', function() {
  buildScripts(true);
});

gulp.task('htmls', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function(){
  return gulp.src('src/web_fonts/*')
  .pipe(gulp.dest('dist/fonts'));
});

var imgExts = ['png', 'jpg', 'jpeg', 'gif', 'ico'];
gulp.task('images', function() {
  return gulp.src(imgExts.map(function(ext) { return 'src/**/*' + ext }))
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return gulp.src(['dist'], {read: false})
    .pipe(clean());
});

gulp.task('build', ['styles', 'scripts', 'htmls', 'fonts', 'images']);

gulp.task('watch', ['styles', 'scriptsWatch', 'htmls', 'fonts', 'images'], function() {
  gulp.watch('src/**/*.less', ['styles']);
  gulp.watch('src/**/*.html', ['htmls']);
});

gulp.task('default', ['clean']);
