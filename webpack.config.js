"use strict";

const webpack = require('webpack');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/umdwebsocket.js",
        library: "umdwebsocket",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ["", ".webpack.js", ".ts", ".js"]
    },
    module: {
        loaders: [
            { test: /\.ts?$/, loader: "babel?presets[]=es2015!ts" }
        ]
    }
};