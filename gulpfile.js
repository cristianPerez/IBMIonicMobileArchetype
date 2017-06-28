var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var useref = require('gulp-useref');
var inject = require('gulp-inject');
var gulpif = require('gulp-if');
var wiredep = require('wiredep').stream;
var angularFilesort = require('gulp-angular-filesort');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var merge = require('gulp-merge-json');
var pump = require('pump');

var paths = {
  sass: ['scss/**/*.scss', '!scss/main.scss', 'www/app/**/*.scss'],
  html: ['www/*.html'],
  js: ['www/app/**/*.js']
};

gulp.task('serve:before', ['serve']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);
gulp.task('upload:before', ['build']);

/*EN PRODUCCION AGREGAR LA FUNCION uglifyJS EN gulp.start*/
gulp.task('build', ['sass', 'move'], function () {
  gulp.start(['inject', 'wiredep', 'useref', 'json']);
});

gulp.task('serve', ['wiredep', 'wiredep:sass', 'useref'], function () {
  gulp.start(['watch', 'json']);
});

gulp.task('imports', function () {
  var sources = gulp.src(['!./scss/Settings/**/*', '!./scss/Tools/**/*', 'scss/**/**/*.scss', '!scss/main.scss', 'www/app/**/*.scss']);
  var target = gulp.src('scss/main.scss');
  return target.pipe(inject(sources, {
    starttag: '/* inject:imports */',
    endtag: '/* endinject */',
    relative: true,
    transform: function (filepath) {
      return '@import "' + filepath + '";';
    }

  }))
    .pipe(gulp.dest('./scss'));
});

gulp.task('sass', ['imports'], function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sass(
      {
        sourceComments: true,
        outputStyle: 'expanded'
      }))
    /*.pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))*/
    .pipe(gulp.dest('./www/css/'));
});

gulp.task('watch', ['inject', 'wiredep'], function () {
  watch(paths.sass, function () {
    gulp.start('sass');
  });
  watch(paths.js, function () {
    gulp.start('inject');
  });
});



gulp.task('inject', function () {
  gulp.src('./www/index.html')
    .pipe(inject(
      gulp.src(['!./www/app/**/*.controller.js', '!./www/app/**/*.service.js', './www/app/**/*.js']).pipe(angularFilesort()), { relative: true }
    ))
    .pipe(inject(
      gulp.src(['./www/css/**/*.css'], { read: false }), { relative: true }
    ))
    .pipe(gulp.dest('./www'));
});

gulp.task('wiredep', function () {
  gulp.src('./www/index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('./www'));
});

gulp.task('wiredep:sass', ['sass'], function () {
  gulp.src('./scss/main.scss')
    .pipe(wiredep({}))
    .pipe(gulp.dest('./scss'));
});

gulp.task('useref', function (done) {
  gulp.src('./www/*.html')
    .pipe(useref())
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('./dist'))
    .on('end', done);
});

gulp.task('uglifyJS', function(cb){
  pump([
    gulp.src('www/app/**/**.js'),
    uglify(),
    gulp.dest('./dist/app'),
  ],cb);
      
});

gulp.task('move', function () {
  gulp.src(['www/app/**/*.html'], { relative: true })
    .pipe(gulp.dest('dist/app'));
  gulp.src(['www/**/*.json'], { relative: true })
    .pipe(gulp.dest('dist'));
  gulp.src(['www/**/*.js'], { relative: true })
    .pipe(gulp.dest('dist'));
});

gulp.task('json', function () {
  gulp.src(['www/app/features/**/*.json'])
    .pipe(merge({"fileName" : "messages_ES.json"}))
    .pipe(gulp.dest('www/app'));
});