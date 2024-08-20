const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();

function scssTask(){
  return src('app/scss/index.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist/styles', { sourcemaps: '.' }));
}

function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['app/scss/**/*.scss'], series(scssTask, browsersyncReload));
}

exports.default = series(
  browsersyncServe,
  scssTask,
  watchTask,
);