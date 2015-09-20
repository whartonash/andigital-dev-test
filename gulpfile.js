var gulp        = require('gulp');
var concat      = require("gulp-concat");
var minifyCSS   = require("gulp-minify-css");
var plumber     = require("gulp-plumber");
var browserSync = require("browser-sync");
var requirejs   = require("requirejs");


gulp.task('scripts', function () {
    requirejs.optimize({
        baseUrl: 'src/',
        paths: {
            jquery: '../bower_components/jquery/dist/jquery.min',
            backbone: '../bower_components/backbone/backbone-min',
            underscore: '../bower_components/underscore/underscore-min',
            async: '../bower_components/requirejs-plugins/src/async',
            gmap: 'utils/googlemaps',
            app: 'app',
            text: '../bower_components/text/text'
        },
        optimize: "uglify",
        out: 'build/app.min.js',
        name: 'main'
    }, function (buildResponse) {
        var contents = fs.readFileSync(config.out, 'utf8');
    }, function(err) {
        console.log(err);
    })
});


gulp.task("css", function () {
    return gulp.src('src/css/**/*.css')
        .pipe(plumber())
        .pipe(concat('app.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('bundle', ['css', 'scripts']);


gulp.task("html", function (){
    return gulp.src(['src/templates/**/*.html', './*.html'])
        .pipe(plumber())
        .pipe(browserSync.reload({stream: true}));
});


gulp.task("serve", ['bundle'], function (){
    browserSync({
        server:{
            baseDir: "./"
        }
    });
});


gulp.task("watch",  ['serve'], function (){
    gulp.watch(['src/**/*.js', './*.js'], ['scripts']);
    gulp.watch('src/**/*.css', ['css']);
    gulp.watch(['src/templates/**/*.html', './*.html'], ['html']);
});


gulp.task("default", ['bundle', 'serve', 'watch']);
