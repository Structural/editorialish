/* Require a whole bunch of stuff */


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
    browserify = require('gulp-browserify');

/* Various Gulp Tasks */

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

gulp.task('scripts', function() {
  return gulp.src('src/editorialish.js')
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.js', '.jsx'],
      shim: {
        underscore: {
          path: 'node_modules/underscore/underscore.js',
          exports: '_'
        }
      }
    }))
    .pipe(gulp.dest('dist'));
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
    .pipe(livereload(server))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return gulp.src(['dist'], {read: false})
    .pipe(clean());
});

gulp.task('build', ['styles', 'scripts', 'htmls', 'fonts', 'images']);

gulp.task('watch', ['build'], function() {
  gulp.watch('src/**/*.less', ['styles']);
  gulp.watch('src/**/*.js', ['scripts']);
  gulp.watch('src/**/*.html', ['htmls']);
});

gulp.task('default', ['clean']);
