var gulp          = require('gulp');
var jade          = require('gulp-jade');
var uglify        = require('gulp-uglify');
var concat        = require('gulp-concat');
var ngAnnotate    = require('gulp-ng-annotate');
var minifyHTML    = require('gulp-minify-html');
var sourcemaps    = require('gulp-sourcemaps');
var imagemin      = require('gulp-imagemin');
var webserver     = require('gulp-webserver');
var less          = require('gulp-less');
var path          = require('path');

dev_path = {
  jade: './src/jade/pages/**/*.jade',
  images: './src/img/**',
  js: './src/js/',
  less: './src/less/styles.less'
};

pub_path = {
  html: './public/',
  images: './public/img/',
  js: './public/js/',
  css: './public/css/'
};

gulp.task('jade', function(){
    gulp.src(dev_path.jade)
        .pipe(jade({pretty: true}))
        .pipe(minifyHTML())
      .pipe(gulp.dest(pub_path.html))
});

gulp.task('images', function() {
  return gulp.src(dev_path.images)
    .pipe(imagemin())
    .pipe(gulp.dest(pub_path.images))
});

gulp.task('js_dev', function () {
    gulp.src([dev_path.js + 'app.js', dev_path.js + '**/*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('app.min.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(pub_path.js))
});
gulp.task('js_pub', function () {
  gulp.src([dev_path.js + 'app.js', dev_path.js + '**/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(pub_path.js))
});

gulp.task('webserver', ['less', 'jade', 'images', 'js_dev'] , function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('less', function () {
  return gulp.src(dev_path.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(pub_path.css));
});

gulp.task('watch', function () {
  gulp.watch('./src/img/**', ['images']);
  gulp.watch('./src/jade/**', ['jade']);
  gulp.watch('./src/js/**', ['js_dev']);
  gulp.watch('./src/less/**', ['less']);
});

gulp.task('dev',['less', 'jade', 'images', 'js_dev', 'webserver', 'watch']);
gulp.task('pub',['less', 'jade', 'images', 'js_pub']);

