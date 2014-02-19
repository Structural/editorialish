var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path');
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
    lr = require('tiny-lr'),
    server = lr(),
    spawn = require('child_process').spawn;

gulp.task('styles', function() {
  return gulp.src('client/src/styles/*.less')
    .pipe(less({paths: [ path.join(__dirname, 'client','src', 'styles') ]}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('client/public/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(livereload(server))
    .pipe(gulp.dest('client/public/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('client/src/scripts/editorialish.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(livereload(server))
    .pipe(gulp.dest('client/public/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('client/src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(livereload(server))
    .pipe(gulp.dest('client/public/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['client/public/styles', 'client/public/scripts', 'client/public/images'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };

    gulp.watch('client/src/styles/**/*.less', ['styles']);
    gulp.watch('client/src/scripts/**/*.js', ['scripts']);
    gulp.watch('client/src/images/**/*', ['images']);
  });
});

gulp.task('server', function() {
  // http://stackoverflow.com/questions/9775921/equivalent-of-rakes-sh-for-jake
  var supervisor = 'supervisor -w server server/editorialish.js';
  var shell = '/bin/sh', args = ['-c', supervisor], child;
  child = spawn(shell, args);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
});
