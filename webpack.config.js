module.exports = {
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    "module": {
        "loaders": [
            {
                test: /\.js$/,
                loader: 'babel'
            },{
                test: /\.tsx?$/,
                "loader": 'ts-loader'
            }
        ],
    },
    "devtool": "source-map"
}