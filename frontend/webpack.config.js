const path = require('path');
const HTMLWebpackPlugin=require('html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={

     entry: './src/index.js',

     output:{
        path:path.join(__dirname,'/dist'),
        filename:'bundle.js'
     },
     plugins:[new HtmlWebpackPlugin({template:'./src/index.html'})],
     module:{
        rules:[
            {
                test:/.js$/,
                exclude:/node_module/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              },
              {
                test: /\.(png|jpg|jpeg|gif!|webp)$/,
                use: ['file-loader']
              },
              {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      outputPath: 'assets/img'
                    }
                  }
                ]
              }
        ]
     },
     devServer: {
      static: {
        directory: path.join(__dirname, 'dist'), // adjust to your build output directory
      },
      historyApiFallback: true, // fallback to /index.html for 404 errors
      port: 8080,
    },

}