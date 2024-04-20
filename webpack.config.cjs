const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src-frontend/entry/main.js'),
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx'],
    },
    experiments: {
        outputModule: true,
    },
    output: {
        clean: true,
        library: {
            type: 'module',
        },
        path: path.resolve(__dirname, './dist/build'),
        filename: '[name].module.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: {
                        esModule: true,
                    },
                },
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: ['raw-loader', 'glslify-loader'],
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src-frontend/static", to: "static" },
            ],
        }),
    ],
}