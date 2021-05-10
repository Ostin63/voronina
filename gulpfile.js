const { src, dest, watch, series, parallel } = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const del = require("del");
const sync = require("browser-sync").create();

const styles = () => {
  return src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

const html = () => {
  return src("source/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest("build"));
}

const scripts = () => {
  return src("source/js/*.js")
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(dest('build/js'))
    .pipe(sync.stream())
}

exports.scripts = scripts;

const images = () => {
  return src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.svgo()
    ]))
    .pipe(dest("build/img"))
}
exports.images = images;

const copy = (done) => {
  src([
    "source/fonts/*.{woff2,woff}",
    "source/libs/*.js"
  ], {
    base: "source"
  })
    .pipe(dest("build"))
  done();
}
exports.copy = copy;

const clean = () => {
  return del("build");
};

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

const reload = done => {
  sync.reload();
  done();
}

const watcher = () => {
  watch("source/less/**/*.less", series(styles));
  watch("source/js/*.js", series(scripts));
  watch("source/*.html", series(html, reload));
}

exports.default = series(
  clean,
  copy,
  parallel(
    styles,
    html,
    scripts,
    images
  ),
  series(
    server,
    watcher
  )
);
