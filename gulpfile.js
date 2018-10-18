const gulp = require("gulp");
const less = require("gulp-less");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const mqpacker = require("css-mqpacker");
const cssminify = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const run = require("run-sequence");
const del = require("del");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html"
  ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("style", function () {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 2 versions"
        ]
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(cssminify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true })
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html:copy", function () {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update",
 ["html:copy"],
  function (done) {
  server.reload();
  done();
});

gulp.task("serve", function () {
  server.init({
    server: "build/", notify: false, open: true, cors: true, ui: false });

  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("*.html", ["html:update"]);
});

gulp.task("build", function (done) {
  run("clean", "copy", "style", "images", done);});