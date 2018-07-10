var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");

// compiles  
gulp.task("sass", function() {
  return gulp
    .src(["src/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", () => {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.js",
      "node_modules/popper.js/dist/popper.js",
      "node_modules/bootstrap/dist/js/bootstrap.js",
      "src/js/*.js"
    ])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

gulp.task("browser-sync", function() {
  browserSync.init(["css/*.css", "js/*.js"], {
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("default", ["sass", "js", "browser-sync"], function() {
  gulp.watch("scss/*.scss", ["sass"]);
});
