var gulp = require('gulp'),
    changed = require('gulp-changed'),
    webpackstream = require('webpack-stream'),
    webpack = require('webpack'),
    webpackDevServer = require('webpack-dev-server'),
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
        "res": "/res/",
        "client": "/dist/app/",
        "server": "/dist/srv/"
    },
    "core": {
        "src": "/modules/core/src/",
        "dist": "/modules/core/dist/"
    },
    "client": {
        "src": "/modules/client/src/",
        "dist": "/modules/client/dist/"
    },
    "server": {
        "src": "/modules/server/src/",
        "dist": "/modules/server/dist/"
    }
}

function wpCfgCore() {
    var myConfig = Object.create(require(paths.webpackconfig));
    myConfig.plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({"mangle": false})
    ]
    myConfig.devtool = 'source-map'
    myConfig.debug = true;
    myConfig["entry"] = __dirname + paths.core.src + "Core"
    myConfig["output"] = {
        "path": __dirname + paths.core.dist,
        "filename": "Core.js",
        "sourceMapFilename": "Core.map.js"
    }
    return myConfig
}

function wpCfgClient() {
    var myConfig = Object.create(require(paths.webpackconfig));
    myConfig.plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({"mangle": false})
    ]
    myConfig.devtool = 'source-map'
    myConfig.debug = true
    myConfig["entry"] = __dirname + paths.client.src + "client"
    myConfig["output"] = {
        "path": __dirname + paths.client.dist,
        "filename": "client.js",
        "sourceMapFilename": "client.map.js"
    }
    return myConfig
}

function wpCfgServer() {
    var myConfig = Object.create(require(paths.webpackconfig))
    myConfig.plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({"mangle": false})
    ]
    myConfig.devtool = 'source-map'
    myConfig.debug = true
    myConfig["entry"] = __dirname + paths.server.src + "server"
    myConfig["output"] = {
        "path": __dirname + paths.server.dist,
        "filename": "server.js",
        "sourceMapFilename": "server.map.js"
    }
    return myConfig
}


gulp.task('default', ['build:client', 'build:server', 'build:static'], function () {

})

gulp.task('dev', function () {

})

gulp.task('build:core', function () {
    webpack(wpCfgCore(), function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
    });
});

gulp.task('buildserver:core', ['build:core'], function (callback) {
    new webpackDevServer(webpack(wpCfgCore()), {
        stats: {
            colors: true
        },
        hot: true
    }).listen(8080, 'localhost', function (err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    });
});

gulp.task('build:client', function () {
    webpack(wpCfgClient(), function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
    });
})

gulp.task('buildserver:client', ['build:client'], function (callback) {
    new webpackDevServer(webpack(wpCfgClient()), {
        stats: {
            colors: true
        },
        hot: true
    }).listen(8081, 'localhost', function (err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8081/webpack-dev-server/index.html');
    });
})

gulp.task('build:server', function () {
    webpack(wpCfgServer(), function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
    });
})

gulp.task('buildserver:server', ['build:server'], function (callback) {
    new webpackDevServer(webpack(wpCfgServer()), {
        stats: {
            colors: true
        },
        hot: true
    }).listen(8082, 'localhost', function (err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8082/webpack-dev-server/index.html');
    });
})



gulp.task('build:static', ['build:server', 'build:client'], function () {
    gulp.src('./res/*.*').pipe(changed(paths.app.client)).pipe(gulp.dest(paths.app.client))
    gulp.src(paths.client.dist + '*.*').pipe(changed(paths.app.client)).pipe(gulp.dest(paths.app.client))
    gulp.src(paths.server.dist + '*.*').pipe(changed(paths.app.server)).pipe(gulp.dest(paths.app.server))
    gulp.src(paths.core.dist + '*.*').pipe(changed(paths.app.server)).pipe(gulp.dest(paths.app.server))
    gulp.src(paths.core.dist + '*.*').pipe(changed(paths.app.client)).pipe(gulp.dest(paths.app.client))
    gulp.src(paths.core.dist + '*.*').pipe(changed(paths.client.res)).pipe(gulp.dest(paths.client.res))
    gulp.src(paths.core.dist + '*.*').pipe(changed(paths.server.res)).pipe(gulp.dest(paths.server.res))
})


//watches
gulp.task('watch', ['buildserver:core', 'buildserver:client', 'buildserver:server', 'watch:res'], function (done) {
    done()
})

gulp.task('watch:res', function () {
    gulp.watch([paths.app.res + '*.*', paths.core.dist + '*.*', paths.client.dist + '*.*', paths.server.dist + '*.*'], ['build:static'])
})
