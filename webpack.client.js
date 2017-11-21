var webpack = require('webpack');
module.exports = {
    "resolve": {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    "plugins" : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ "mangle": true })
    ],
    "module": {
        "loaders": [
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.ts(x?)$/, loader: 'babel-loader!ts-loader' }
        ],
    },
    "output": {
        "path":__dirname + "/dist/app/",
         "library": "Client",
        "libraryTarget": "umd",
        "filename": "Client.js",
        "sourceMapFilename": "Client.map.js"
    },
    "entry": __dirname + "/modules/client/Client",
    //"externals": [nodeExternals()],
    "target": "web",
    "devtool": "source-map",
    "console": false,
    "global": false,
    "process": true,
    "Buffer": true,
    "__filename": "mock",
    "__dirname": "mock",
    "setImmediate": true
}