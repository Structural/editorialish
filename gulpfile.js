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
  return gulp.src('client/editorialish.less')
    .pipe(less({paths: [ path.join(__dirname, 'client') ]}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(livereload(server))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
  // Shim options copied from
  // https://github.com/marionettejs/backbone.marionette/wiki/Using-Marionette-With-Browserify-and-Grunt

  return gulp.src('client/editorialish.js')
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
    .pipe(gulp.dest('dist'));
});

gulp.task('htmls', function() {
  fs.readFile('client/index.html', function(err, data) {
    return gulp.src(['client/**/*.html', '!client/index.html'])
      .pipe(concat('index.html'))
      .pipe(templateInject(data, 'templates'))
      .pipe(gulp.dest('dist'));
  });
  // return gulp.src('client/*.html')
  //   .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function(){
  return gulp.src('client/web_fonts/*')
  .pipe(gulp.dest('dist/fonts'));
});

var imgExts = ['png', 'jpg', 'jpeg', 'gif'];
gulp.task('images', function() {
  return gulp.src(imgExts.map(function(ext) { return 'client/**/*' + ext }))
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(livereload(server))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return gulp.src(['dist'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', ['clean', 'styles', 'scripts', 'htmls', 'fonts', 'images'], function() {
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };

    gulp.watch('client/*.less', ['styles']);
    gulp.watch('client/**/*.less', ['styles']);
    gulp.watch('client/*.js', ['scripts']);
    gulp.watch('client/**/*.js', ['scripts']);
    gulp.watch('client/*.html', ['htmls']);
    gulp.watch('client/**/*.html', ['htmls']);
    gulp.watch('client/**/*', ['images']);
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
