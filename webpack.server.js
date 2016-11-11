var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
module.exports = {
    "plugins": [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ "mangle": true })
    ],
    "resolve": {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    "output": {
        "library": "Server",
        "libraryTarget": "commonjs",
        "filename": "Server.js",
        "sourceMapFilename": "Server.map.js"
    },
    "module": {
        "loaders": [
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.ts(x?)$/, loader: 'babel-loader!ts-loader' }
        ],
    },
    "externals": [nodeExternals()],
    "target": "node",
    "devtool": "source-map",
    "console": false,
    "global": false,
    "process": true,
    "Buffer": true,
    "__filename": "mock",
    "__dirname": "mock",
    "setImmediate": true
}