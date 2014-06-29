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
    replace = require('gulp-replace'),
    streamify = require('gulp-streamify'),
    shell = require('gulp-shell'),
    livereload = require('gulp-livereload'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

var environments = {
  undefined: {
    firebaseApp: 'editorialish',
    sourceMaps: false
  },
  'sean': {
    firebaseApp: 'sean-editorialish',
    sourceMaps: true
  },
  'will': {
    firebaseApp: 'will-editorialish',
    sourceMaps: true
  }
};

var getEnvironment = function() {
  return environments[gutil.env.e || gutil.env.environment]
};

var logAndEnd = function(taskName) {
  return function(error) {
    gutil.log(error);
    notify.onError(taskName + ' failed, see logs')(error);
    this.end();
  }
};

gulp.task('styles', ['clean'], function() {
  return gulp.src('src/less/editorialish.less')
    .pipe(less({paths: [ path.join(__dirname, 'src') ]}))
    .on('error', logAndEnd('LESS'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist'));
});

var buildScripts = function(watch) {
  var bundler, rootFile = './src/js/editorialish.js';
  if (watch) {
    bundler = watchify(rootFile);
  } else {
    bundler = browserify(rootFile);
  }

  bundler.transform(reactify);

  var rebundle = function() {
    gutil.log('Building js with browserify');
    var environment = getEnvironment();

    var stream = bundler.bundle({debug: environment.sourceMaps});
    stream.on('error', logAndEnd('Browserify'));

    stream = stream.pipe(source('editorialish.js'));
    stream = stream.pipe(streamify(replace('$FIREBASE_APP', environment.firebaseApp)));

    return stream.pipe(gulp.dest('dist'));
  }
  bundler.on('update', rebundle);
  return rebundle();
}

gulp.task('scripts', ['clean'], function() {
  return buildScripts(false);
});

gulp.task('scriptsWatch', ['clean'], function() {
  return buildScripts(true);
});

gulp.task('htmls', ['clean'], function() {
  gulp.src('src/index.html')
      .pipe(rename('404.html'))
      .pipe(gulp.dest('dist'));
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', ['clean'], function(){
  return gulp.src('src/web_fonts/*')
  .pipe(gulp.dest('dist/fonts'));
});

var imgExts = ['png', 'jpg', 'jpeg', 'gif', 'ico', 'svg'];

gulp.task('images', ['clean'], function() {
  return gulp.src(imgExts.map(function(ext) { return 'src/**/*' + ext }))
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return gulp.src(['dist'], {read: false})
    .pipe(clean());
});

gulp.task('build', ['styles', 'scripts', 'htmls', 'fonts', 'images']);

gulp.task('watch', ['scriptsWatch', 'styles', 'htmls', 'fonts', 'images'], function() {
  gulp.watch('src/**/*.less', ['styles']);
  gulp.watch('src/**/*.html', ['htmls']);
});

gulp.task('firebase-json', function() {
  var environment = getEnvironment();
  return gulp.src('firebase.json.template')
             .pipe(replace('$FIREBASE_APP', environment.firebaseApp))
             .pipe(rename('firebase.json'))
             .pipe(gulp.dest('.'));
});

gulp.task('deploy', ['build', 'firebase-json'],
          shell.task('firebase deploy'));
