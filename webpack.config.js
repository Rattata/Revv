module.exports = {
    "module": {
        "loaders": [
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader'
                ],
            },
        ],
    },
    "devtool": "source-map"
}