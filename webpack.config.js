module.exports = {
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    "module": {
        "preLoaders": [

        ],
        "loaders": [
            { test: /\.ts(x?)$/, loader: 'babel-loader!ts-loader' }
        ],
    },
    "devtool": "source-map",
    "console": false,
    "global": true,
    "process": true,
    "Buffer": true,
    "__filename": "mock",
    "__dirname": "mock",
    "setImmediate": true
}