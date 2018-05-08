let config = require('./config.js');

const gulp = require('gulp'),
      pug = require('gulp-pug'),
      scss = require('gulp-sass'),
      babel = require('gulp-babel'),
      transpile = require('gulp-es6-module-transpiler'),
      recast = require('recast'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      using = require('gulp-using'),
      plumber = require('gulp-plumber'),
      clean = require('gulp-clean'),
      browserSync = require('browser-sync');

let configuration = config.development;


const reload = function(config) {
  return browserSync.reload({stream: true});
}

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: configuration.outputFolder
    }
  })
});

gulp.task('pug', function() {
  return gulp.src('./src/pug/pages/*.pug')
    .pipe(using({}))
    .pipe(plumber())
    .pipe(pug({ pretty: true, data: configuration.pugData }))
    .pipe(gulp.dest(configuration.outputFolder))
    .pipe(reload())
});

gulp.task('php', function() {
  return gulp.src('./src/pug/pages/*.pug')
    .pipe(using({}))
    .pipe(plumber())
    .pipe(pug({ pretty: true, data: configuration.pugData }))
    .pipe(rename({ extname: ".php" }))
    .pipe(gulp.dest(configuration.outputFolder))
    
})

gulp.task('scss', function() {
  return gulp.src('./src/scss/styles/*.scss')
    .pipe(using({}))
    .pipe(plumber())
    .pipe(scss.sync({
      data: configuration.scssData
    }))
    .pipe(gulp.dest(configuration.outputFolder + 'css'))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(configuration.outputFolder + 'css'))
    .pipe(reload())
});

gulp.task('es6', function() {
  return gulp.src('./src/es6/scripts/*.js')
    .pipe(using({}))
    .pipe(plumber())
    .pipe(transpile({
      formatter: 'bundle',
      basePath: './src/es6/scripts/'
    }))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest(configuration.outputFolder + 'js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(configuration.outputFolder + 'js'))
    .pipe(reload());
    
});

gulp.task('moveData', function() {
  gulp.src('./src/data/**/*.*')
    .pipe(using({}))
    .pipe(plumber())
    .pipe(gulp.dest(configuration.outputFolder + 'data'))
});

gulp.task('media', function() {
  gulp.src('./src/media/**/*.*')
    .pipe(using({}))
    .pipe(plumber())
    .pipe(gulp.dest(configuration.outputFolder + 'media'))
});

gulp.task('watcher', function() {
  gulp.watch('./src/pug/**/*.pug', (event, sb) => {
    gulp.start('pug');
  });
  gulp.watch('./src/scss/**/*.scss', (event, sb) => {
    gulp.start('scss');
  });
  gulp.watch('./src/es6/**/*.js', (event, sb) => {
    gulp.start('es6');
  });
});

gulp.task('setProduction', function() {
  configuration = config.production;
});

gulp.task('setDevelopment', function() {
  configuration = config.development;
});

gulp.task('uglifyJs', function() {
  gulp.src(configuration.outputFolder + 'js/**/*.js')
    .pipe(using({}))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(configuration.outputFolder + 'js'))
});

gulp.task('uglifyCss', function() {
  gulp.src(configuration.outputFolder + 'css/**/*.css')
    .pipe(using({}))
    .pipe(plumber())
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(configuration.outputFolder + 'css'))
});

gulp.task('clean', function() {
  gulp.start(['cleanProduction', 'cleanDevelopment']);
});


gulp.task('cleanProduction', function() {
  configuration = config.production;
  gulp.src(configuration.outputFolder, { read: false })
    .pipe(clean({forse: true}))
});

gulp.task('cleanDevelopment', function() {
  configuration = config.development;
  gulp.src(configuration.outputFolder, { read: false })
    .pipe(clean({forse: true}))
});

gulp.task('default', ['watcher', 'browser-sync', 'moveData', 'media', 'es6', 'scss', 'pug']);
gulp.task('production', ['setProduction', 'moveData', 'media', 'es6', 'scss', 'php']);




