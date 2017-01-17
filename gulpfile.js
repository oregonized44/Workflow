var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');


/////////////////////////////////////// SOURCE PATHS  ///////

var SOURCEPATHS = {
  sassSource : 'src/scss/*.scss',
  htmlSource : 'src/*.html'
};

var APPPATH = {
  root: 'app/',
  css: 'app/css',
  js: 'app/js'
};

//////////////////////////////////////// GULP TASKS  ///////

gulp.task('clean-html', function(){
  return gulp.src(APPPATH.root + '/*.html', {read: false, force: true})
        .pipe(clean());
});
//SASS//

gulp.task('sass', function(){
  return gulp.src('src/scss/app.scss')
        .pipe(autoprefixer())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css));
});

//COPY//////////////////////////////////////////////////////

gulp.task('copy', ['clean-html'], function(){
  gulp.src(SOURCEPATHS.htmlSource)
      .pipe(gulp.dest(APPPATH.root));
});

//SERVE////////////////////////////////////////////////////

gulp.task('serve', ['sass'], function(){
  browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
    server: {
      baseDir : APPPATH.root
    }
  });
});

//WATCH////////////////////////////////////////////////////

gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html'], function(){
  gulp.watch([SOURCEPATHS.sassSource], ['sass']);
  gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
});

//DEFAULT/////////////////////////////////////////////////

gulp.task('default', ['watch']);
