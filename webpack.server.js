var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
module.exports = {
    "plugins": [
        new webpack.optimize.DedupePlugin()
        // ,
        // new webpack.optimize.UglifyJsPlugin({ "mangle": false })
    ],
    "resolve": {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        modulesDirectories: [
        "node_modules"
      ]
    },
    "module": {
        "loaders": [
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.ts(x?)$/, loader: 'babel-loader!ts-loader' }
        ],
    },
    "output": {
        "path": __dirname + "/dist/srv/",
        "library": "Server",
        "libraryTarget": "commonjs",
        "filename": "Server.js",
        "sourceMapFilename": "Server.map.js"
    },
    "entry": __dirname + "/modules/server/Server",
    "externals": [nodeExternals()],
    "target": "node",
    "devtool": "source-map",
    "console": false,
    "global": true,
    "process": true,
    "Buffer": true,
    "__filename": "mock",
    "__dirname": "mock",
    "setImmediate": true
}