const path = require('path');
var config = {
    entry: './main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve('dist'),
      publicPath: '/'
    },
    devServer: {
       inline: true,
       port: 3000,
       hot: true,
       compress: true,
       https: false,
       historyApiFallback: true,
       proxy: {
          '/api': 'http://localhost:8090'
       }
    },
    module: {
       rules: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                presets: ['es2017', 'react'],
                plugins: [
                  "transform-object-rest-spread",
                ]
             }
          },
          {
            test: /\.css$/,
            use: [
                {loader: "style-loader"},
                {loader: "css-loader"}
            ]
          },          
          {
            test: /\.(jpg|png)$/,
            use: {
              loader: "url-loader",
              options: {
                limit: 25000,
              },
            }
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {},
              },
            ],
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
          },
          {
            test: /\.(jpg|png)$/,
            use: {
               loader: "file-loader",
               options: {
               name: "[path][name].[hash].[ext]",
               },
            }
         }
       ]
    },
    resolve: {
       extensions: ['.js', '.jsx', '.css']
    }
 }
 module.exports = config;