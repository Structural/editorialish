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
  // Shim options copied from
  // https://github.com/marionettejs/backbone.marionette/wiki/Using-Marionette-With-Browserify-and-Grunt

  return gulp.src('client/src/scripts/editorialish.js')
    .pipe(browserify({
      insertGlobals: true,
      shim: {
        jquery: {
          path: 'node_modules/jquery/dist/jquery.js',
          exports: '$'
        },
        underscore: {
          path: 'node_modules/underscore/underscore.js',
          exports: '_'
        },
        backbone: {
          path: 'node_modules/backbone/backbone.js',
          exports: 'Backbone',
          depends: {
            underscore: 'underscore'
          }
        },
        'backbone.babysitter': {
          path: 'node_modules/backbone.babysitter/lib/backbone.babysitter.js',
          exports: 'Backbone.Babysitter',
          depends: {
            backbone: 'Backbone'
          }
        },
        'backbone.wreqr': {
          path: 'node_modules/backbone.wreqr/lib/backbone.wreqr.js',
          exports: 'Backbone.Wreqr',
          depends: {
            backbone: 'Backbone'
          }
        },
        'backbone.marionette': {
          path: 'node_modules/backbone.marionette/lib/backbone.marionette.js',
          exports: 'Marionette',
          depends: {
            jquery: '$',
            backbone: 'Backbone',
            underscore: '_'
          }
        }
      }
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

    gulp.watch('client/src/styles/*.less', ['styles']);
    gulp.watch('client/src/styles/**/*.less', ['styles']);
    gulp.watch('client/src/scripts/*.js', ['scripts']);
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
