var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('src/components/main_page/static/scss/template.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('src/dist/css/'))
});
