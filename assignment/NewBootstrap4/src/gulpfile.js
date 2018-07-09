const gulp= require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// compiles 
gulp.task('sass', function(){
    return gulp
        .src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream())
});

gulp.task('js', () => {
    return gulp
        .src('../node_modules/bootstrap/dist/js/bootstrap.js', 'src/js/*.js')
        .pipe(sass())
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream())
});


gulp.task('serve', () => {
    return gulp
        .src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream())
});




    
