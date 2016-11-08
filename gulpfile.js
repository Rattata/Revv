var gulp = require('gulp'),
    changed = require('gulp-changed'),
    webpackstream = require('webpack-stream'),
    webpack = require('webpack'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    sourcemap = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    _ = require('lodash'),
    rimraf = require('rimraf'),
    fs = require('fs'),
    path = require('path');

var paths = {
    "webpackconfig": "./webpack.config.js",
    "app": {
        "res": "./res/",
        "client": "./dist/app/",
        "server": "./dist/srv/"
    },
    "core": {
        "src": "./modules/core/src/",
        "dist": "./modules/core/dist/",
    },
    "client": {
        "src": "./modules/client/src/",
        "dist": "./modules/client/dist/"
    },
    "server": {
        "src": "./modules/server/src/",
        "dist": "./modules/server/dist/"
    }
}

var MODES = {
    "DEV": {},
    "TST": {},
    "PRD": {}
};

var MODE = MODES.DEV;

gulp.task('default', ['build:client', 'build:server', 'build:static'], function () {
    MODE = MODES.DEV
})

gulp.task('dev', function () {

})

gulp.task('build:core', function () {
    var myConfig = Object.create(require(paths.webpackconfig));
    myConfig.plugins = [
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin()
    ];
    myConfig["context"] = __dirname,
        myConfig["entry"] = paths.core.src + "Map",
        myConfig["output"] = {
            "path": __dirname + "/modules/core/dist/",
            "filename": "bundle.js",
            "sourceMapFilename": "bundle.map.js"
        }

    // run webpack
    console.log(myConfig)
    webpack(myConfig, function (err, stats) {
        //if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
    });

    gulp.src([paths.core.src + 'Map.js'])
        .pipe(sourcemap.init())
        .pipe(babel())
        .pipe(concat("core.js"))
        .pipe(uglify())
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest(paths.core.dist))
})

gulp.task('build:client', ['build:core'], function () {

    gulp.src(paths.client.src + '**/*.*')
        .pipe(sourcemap.init())
        .pipe(babel())
        .pipe(concat("client.js"))
        //.pipe(uglify())
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest(paths.client.dist))
})

gulp.task('build:server', ['build:core'], function () {
    gulp.src(paths.server.src + '**/*.*')
        .pipe(sourcemap.init())
        .pipe(babel())
        .pipe(concat("server.js"))
        .pipe(uglify())
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest(paths.server.dist))
})

gulp.task('build:static', ['build:server', 'build:client'], function () {
    gulp.src('./res/*.*').pipe(changed(paths.app.client)).pipe(gulp.dest(paths.app.client))
    gulp.src(paths.client.dist + '*.*').pipe(changed(paths.app.client)).pipe(gulp.dest(paths.app.client))
    gulp.src(paths.server.dist + '*.*').pipe(changed(paths.app.server)).pipe(gulp.dest(paths.app.server))
    gulp.src(paths.core.dist + '*.*').pipe(changed(paths.app.server)).pipe(gulp.dest(paths.app.server))
    gulp.src(paths.core.dist + '*.*').pipe(changed(paths.app.client)).pipe(gulp.dest(paths.app.client))
})


//watches
gulp.task('watch', ['watch:res', 'watch:core', 'watch:server', 'watch:client'], function (done) {
    done()
})

gulp.task('watch:res', function () {
    gulp.watch([paths.app.res + '*.*', paths.core.dist + '*.*', paths.client.dist + '*.*', paths.server.dist + '*.*'], ['build:static'])
})

gulp.task('watch:core', function () {
    gulp.watch(paths.core.src + '*.*', ['build:core'])
})

gulp.task('watch:client', function () {
    gulp.watch(paths.client.src + '*.*', ['build:client'])
})

gulp.task('watch:server', function () {
    gulp.watch(paths.server.src + '*.*', ['build:server'])
})
