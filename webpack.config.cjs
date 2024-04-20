const path = require('path')
// const CopyPlugin = require("copy-webpack-plugin");
// const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
    // mode: "production",
    entry: {
        main: path.resolve(__dirname, './src-frontend/entry/main.jsx'),
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx'],
    },
    experiments: {
        outputModule: true,
    },
    output: {
        chunkFormat: 'module',
        chunkFilename: '[hash].[id].js',
        asyncChunks: true,
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
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src-frontend'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
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
            },
        ],
    },
    plugins: [
        // new WebpackManifestPlugin({
        //     basePath: path.join(__dirname, 'dist'),
        //     fileName: 'manifest.json'
        // })
        // new CopyPlugin({
        //     patterns: [
        //         { from: "src-frontend/static", to: "static" },
        //     ],
        // }),
    ],
}

//