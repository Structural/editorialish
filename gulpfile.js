/* Require a whole bunch of stuff */


var gulp = require('gulp'),
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
    browserify = require('gulp-browserify'),
    templateInject = require('./gulp/template-inject'),
    lr = require('tiny-lr'),
    fs = require('fs'),
    server = lr(),
    spawn = require('child_process').spawn;

/* Various Gulp Tasks */

gulp.task('styles', function() {
  return gulp.src('src/editorialish.less')
    .pipe(less({paths: [ path.join(__dirname, 'src') ]}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(livereload(server))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
  return gulp.src('src/editorialish.js')
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.js', '.jsx']
    }))
    .pipe(livereload(server))
    .pipe(gulp.dest('dist'));
});

gulp.task('htmls', function() {
  fs.readFile('src/index.html', function(err, data) {
    return gulp.src(['src/**/*.html', '!src/index.html'])
      .pipe(concat('index.html'))
      .pipe(templateInject(data, 'templates'))
      .pipe(gulp.dest('dist'));
  });
  // return gulp.src('src/*.html')
  //   .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function(){
  return gulp.src('src/web_fonts/*')
  .pipe(gulp.dest('dist/fonts'));
});

var imgExts = ['png', 'jpg', 'jpeg', 'gif'];
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

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'htmls', 'fonts');
});

gulp.task('watch', ['clean', 'styles', 'scripts', 'htmls', 'fonts', 'images'], function() {
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };

    gulp.watch('src/*.less', ['styles']);
    gulp.watch('src/**/*.less', ['styles']);
    gulp.watch('src/*.js', ['scripts']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/*.html', ['htmls']);
    gulp.watch('src/**/*.html', ['htmls']);
    gulp.watch('src/**/*', ['images']);
  });
});
