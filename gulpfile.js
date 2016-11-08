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
    "dist" : "./dist",
    "app": {
        "res": "./res/",
        "client": "./dist/app/",
        "server": "./dist/srv/"
    },
    "client": {
        "src": "/modules/client/",
        "dist": "/modules/client/dist/",
        "res": "/modules/client/res/"
    },
    "server": {
        "src": "/modules/server/",
        "dist": "/modules/server/dist/",
        "res": "/modules/server/res/"
    }
}

function wpCfgClient() {
    var myConfig = Object.create(require(paths.webpackconfig));
    myConfig.plugins = [
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin({"mangle": false})
    ]
    myConfig.devtool = 'source-map'
    myConfig.debug = true
    myConfig["entry"] = __dirname + paths.client.src + "Client"
    myConfig["output"] = {
        "path": paths.app.client,
        "publicPath": paths.app.client,
        "library": "Client",
        "libraryTarget": "umd",
        "filename": "Client.js",
        "sourceMapFilename": "Client.map.js"
    }
    return myConfig
}

function wpCfgServer() {
    var myConfig = Object.create(require(paths.webpackconfig))
    myConfig.plugins = [
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin({"mangle": false})
    ]
    myConfig.devtool = 'source-map'
    myConfig.debug = true
    myConfig["entry"] = __dirname + paths.server.src + "Server"
    myConfig["output"] = {
        "path": paths.app.server,
        "publicPath": paths.app.server,
        "library": "Server",
        "libraryTarget": "umd",
        "filename": "Server.js",
        "sourceMapFilename": "Server.map.js"
    }
    return myConfig
}


gulp.task('default', ['build:client', 'build:server', 'build:static', 'express'], function() {

})

gulp.task('express', function() {

})

gulp.task('build:client', function() {
    webpack(wpCfgClient(), function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
    });
})

gulp.task('buildserver:client', ['build:client'], function(callback) {
    new webpackDevServer(webpack(wpCfgClient()), {
        stats: {
            colors: true
        },
        hot: true
    }).listen(8081, 'localhost', function(err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8081/webpack-dev-server/index.html');
    });
})

gulp.task('build:server', function() {
    webpack(wpCfgServer(), function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
    });
})

gulp.task('buildserver:server', ['build:server'], function(callback) {
    new webpackDevServer(webpack(wpCfgServer()), {
        stats: {
            colors: true
        },
        hot: true
    }).listen(8082, 'localhost', function(err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8082/webpack-dev-server/index.html');
    });
})

gulp.task('clean', function(bc){
    function cb(){}
    rimraf(paths.dist, cb)
    rimraf("."+paths.client.dist,cb)
    rimraf("."+paths.server.dist,cb)
    rimraf("."+paths.core.dist,cb)
    rimraf("."+paths.server.res,cb)
    rimraf("."+paths.client.res,cb)
    bc()

})

gulp.task('build:static', function(callback) {
    gulp.src(paths.app.res + '*').pipe(changed(paths.app.client)).pipe(gulp.dest(paths.app.client))
    callback()
})

gulp.task('watch:static', function() {
    gulp.watch([paths.app.res + '*.*', "." + paths.core.dist + '*.*', "." + paths.client.dist + '*.*', "." + paths.server.dist + '*.*'], ['build:static'])
})

gulp.task('watch', function(){
    gulp.watch('.' + paths.server.src + "*.*", ['build:server'])
    gulp.watch( paths.app.res+ "*.*",  ['build:static'])
    gulp.watch('.' + paths.client.src + "*.*", ['build:client'])
});


