/* eslint-disable no-undef */
/* eslint-disable global-require */
 const path = require('path');
 const HTMLWebpackPlugin = require('html-webpack-plugin');
 const {
     CleanWebpackPlugin
 } = require('clean-webpack-plugin');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');

 const CopyWebpackPlugin = require('copy-webpack-plugin');



 const isDev = process.env.NODE_ENV === 'development';
 const isProd = !isDev;

 const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

 module.exports = {
     context: path.resolve(__dirname, 'src'),
     mode: 'development',
     entry: './js/main.js',
     output: {
         filename: `./js/${filename('js')}`,
         path: path.resolve(__dirname, 'app'),
         publicPath: '',
         clean: true,
     },
     devServer: {
         historyApiFallback: true,
         //  contentBase: path.resolve(__dirname, 'app'),
         open: true,
         compress: true,
         hot: true,
         port: 9000,
         static: {
             directory: path.join(__dirname, 'app')
         }
     },
     plugins: [
         new HTMLWebpackPlugin({
             template: path.resolve(__dirname, 'src/index.html'),
             filename: 'index.html',
             minify: {
                 collapseWhitespace: isProd
             }
         }),
         new CleanWebpackPlugin(),
         new MiniCssExtractPlugin({
             filename: `./css/${filename('css')}`
         }),
        //  копируем файлы из папки assets - типа mail.php или видео
         new CopyWebpackPlugin({
             patterns: [{
                 from: path.resolve(__dirname, 'src/assets'),
                 to: path.resolve(__dirname, 'app')
             }]
         }),
     ],
     devtool: isProd ? false : 'source-map',
     module: {
         rules: [{
                 test: /\.html$/,
                 loader: 'html-loader',
             },
               //  стили css
             {
                 test: /\.css$/i,
                 use: [{
                         loader: MiniCssExtractPlugin.loader,
                         options: {
                             hmr: isDev
                         },
                     },
                     'css-loader'
                 ],
             },
            //  стили sass
             {
                 test: /\.s[ac]ss$/,
                 use: [{
                         loader: MiniCssExtractPlugin.loader,
                         options: {
                             publicPath: (resourcePath, context) => {
                                 return path.relative(path.dirname(resourcePath), context) + '/';
                             },
                         }
                     },
                     'css-loader',
                     'sass-loader'
                 ],
             },
            //  babel - транспилятор - на старый код js
             {
                 test: /\.(?:js|mjs|cjs)$/i,
                 exclude: /node_modules/,
                 use: {
                     loader: 'babel-loader',
                     options: {
                         presets: [
                             ['@babel/preset-env', {
                                 targets: 'defaults'
                             }]
                         ],
                     },
                 }
             },
            //  картинки
             {
                 test: /\.(jpe?g|png|webp|gif|svg)$/i,
                 use: [{
                     loader: 'image-webpack-loader',
                     options: {
                         mozjpeg: {
                             progressive: true,
                         },
                         // optipng.enabled: false will disable optipng
                         optipng: {
                             enabled: false,
                         },
                         pngquant: {
                             quality: [0.65, 0.9],
                             speed: 4,
                         },
                         gifsicle: {
                             interlaced: false,
                         },
                         // the webp option will enable WEBP
                         webp: {
                             quality: 75,
                         },
                     },
                 }, ],
                 type: 'asset/resource',
                 generator: {
                     filename: 'img/[name].[contenthash][ext]',
                 },
             },
            //  шрифты
             {
                 test: /\.woff2?$/i,
                 type: 'asset/resource',
                 generator: {
                     filename: 'fonts/[name][contenthash][ext]',
                 },
             }

         ]
     }
 };
