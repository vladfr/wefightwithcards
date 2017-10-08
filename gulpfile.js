var gulp         = require("gulp"),
    sass         = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer");

var sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

// Compile SCSS files to CSS
var scss_asset_folder = "themes/wefight/static/scss/**/";
gulp.task("scss", function () {
    gulp.src(scss_asset_folder + '*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle : "compressed",
            includePaths: ['node_modules']
        }))
        .pipe(autoprefixer({
            browsers : ["last 20 versions"]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("themes/wefight/static/css/"))
});

// Watch asset folder for changes
gulp.task("watch", ["scss"], function () {
    gulp.watch(scss_asset_folder + '/*', ["scss"])
});

gulp.task("images", function(){
    gulp.src('static/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('static'))
});

gulp.task("default", ["scss"]);

gulp.task("build", ["scss", "images"]);