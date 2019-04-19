/**
 * Copyright 2019 SME Virtual Network Contributors. All Rights Reserved.
 * See LICENSE in the repository root for license information.
 * =============================================================================
 */

import BrowserSync from "browser-sync";

import autoprefixer from "autoprefixer";
import del from "del";
import gulp from "gulp";
import sass from "gulp-sass";
import gulpPostcss  from "gulp-postcss";
import gulpRename from "gulp-rename";
import gulpStylelint from "gulp-stylelint";
import gulpSourcemaps from "gulp-sourcemaps";
import log from "fancy-log";

sass.compiler = require("dart-sass");

const browserSync = BrowserSync.create();

const IS_PRODUCTION = process.env.NODE_ENV === "production";

log.warn("[Gulp] build mode: ", IS_PRODUCTION ? "PRODUCTION" : "DEVELOPMENT");


/**
 * CLEAN TASK
 * -----------------------------------------------------------------------------
 */
gulp.task("clean", () =>
  del(["./dist", "./dist/**/*", "./docs/**/*.css*"], {
    force: true
}));


/**
 * RUN DEVELOPMENT SERVER TASK
 * -----------------------------------------------------------------------------
 * Run the development server with Browsersync. Gulp will watch for source file
 * changes and Browsersync will reload the browser as necessary.
 */
gulp.task("dev-server", () => {
  browserSync.init({
    server: {
      baseDir: "./docs"
    }
  });
  gulp.watch("./docs/**/*").on("change", browserSync.reload);
  gulp.watch(["./src/**/*"], gulp.series("build:css"));
});


/**
 * SASS LINT TASK
 * -----------------------------------------------------------------------------
 */
gulp.task("lint:sass", () =>
  gulp.src("./src/**/*.scss")
    .pipe(gulpStylelint({
      reporters: [
        {formatter: "verbose", console: true}
      ],
      failAfterError: false
    }))
);


/**
 * BUILD CSS TASKS
 * -----------------------------------------------------------------------------
 */
const buildCss = (isCompressed) => {
  return function() {
    return gulp.src("./src/**/*.scss")
      .pipe(gulpSourcemaps.init())
      .pipe(sass({
        outputStyle: isCompressed ? "compressed" : "expanded"
      }).on("error", sass.logError))
      .pipe(gulpRename(function (path) {
        if (isCompressed) {
          path.basename += ".min";
        }
      }))
      .pipe(gulpPostcss([
        autoprefixer({
          browsers: ["> 1%", "ie >= 11", "last 2 versions"]
        })
      ]))
      .pipe(gulpSourcemaps.write("."))
      .pipe(gulp.dest("./dist"))
      .pipe(gulp.dest("./docs"))
  }
};

gulp.task("build:css:prod", gulp.series("lint:sass", buildCss(true)));
gulp.task("build:css:dev", gulp.series("lint:sass", buildCss(false)));
gulp.task("build:css", gulp.series("build:css:prod", "build:css:dev"));

/**
 * BUILD TASK
 * -----------------------------------------------------------------------------
 */
gulp.task(
  "build",
  gulp.series("clean", "build:css")
);


/**
 * LOCAL SERVER RUN TASK
 * -----------------------------------------------------------------------------
 */
gulp.task("serve", gulp.series("build", "dev-server"));
