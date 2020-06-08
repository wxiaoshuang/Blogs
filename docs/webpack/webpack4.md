# webpack
1. 各种sourceMap的区别

```
node_modules/
build/
    webpack.common.conf.js
    webpack.dev.conf.js
    webpack.prod.conf.js
    webpack.dll.conf.js
    dll.config.js
src/ 
    app.js
    my.css
    index.css
    index.less,
index.html
package.json
package-lock.json
    
```

`package.json`

```json
{
  "name": "lesson1",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "dll": "webpack -p --progress --config build/webpack.dll.conf.js",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.dev.conf.js --open --hot",
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.prod.conf.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.17.1",
    "express-static": "^1.2.6",
    "jquery": "^3.5.1",
    "lodash": "^4.17.15",
    "vue": "^2.6.11",
    "vue-router": "^3.3.2",
    "vuex": "^3.4.0"
  },
  "devDependencies": {
    "@babel/core": "^7.10.2",
    "@babel/polyfill": "^7.10.1",
    "@babel/preset-env": "^7.10.2",
    "babel-loader": "^8.1.0",
    "clean-webpack-plugin": "^3.0.0",
    "core-js": "^3.6.5",
    "cross-env": "^7.0.2",
    "css-loader": "^3.5.3",
    "eslint": "^7.1.0",
    "eslint-config-airbnb-base": "^14.1.0",
    "eslint-loader": "^4.0.2",
    "eslint-plugin-import": "^2.20.2",
    "file-loader": "^6.0.0",
    "html-webpack-plugin": "^4.3.0",
    "less": "^3.11.2",
    "less-loader": "^6.1.0",
    "mini-css-extract-plugin": "^0.9.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss-loader": "^3.0.0",
    "postcss-preset-env": "^6.7.0",
    "style-loader": "^1.2.1",
    "terser-webpack-plugin": "^3.0.2",
    "url-loader": "^4.1.0",
    "vue-loader": "^15.9.2",
    "vue-template-compiler": "^2.6.11",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.11.0",
    "webpack-merge": "^4.2.2"
  },
  "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      "> 0.2%",
      "not dead",
      "not op_mini all"
    ]
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```



###### **webpack.common.conf.js**

`webpack.common.conf.js`

```javascript

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    app: path.join(__dirname, "../", "src/index.js"),
    entry2: path.join(__dirname, "../", "src/entry2.js"),
  },
  output: {
    path: path.join(__dirname, "../", "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    alias: {
       'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname,'../src')
    },
    extensions: ['.js', '.json', '.vue', '.jsx']
  },
  module: {
    rules: [
       { test:/\.vue$/,
        loader:'vue-loader'},
      {
        test: /\.js$/,
        // string, reg, or array
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: {
                      version: 3,
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|gif|png)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024, //60KB
              name: "[name].[hash:10].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../", "index.html"),
    })
  ],
};
```

###### **webpack.dev.conf.js**

`webpack.dev.conf.js`

```javascript
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.conf')
module.exports = merge(commonConfig, {
  mode: "development",
  devtool:'cheap-module-source-map',
  output: {
    filename: "js/[name].js",
    chunkFilename: "js/chunk.[name].[contenthash:10].js",
  },
  devServer: {
	contentBase: path.join(__dirname, "../", "dist"),
	hot: true,
	open: true,
	port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [require("postcss-preset-env")],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [require("postcss-preset-env")],
            },
          },
          "less-loader",
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../", "index.html"),
    })
  ]
})

```

###### **webpack.prod.conf.js**

`webpack.prod.conf.js`
```javascript
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.conf");
const library = require('./dll.config')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "js/[name].[contenthash:10].js",
    chunkFilename: "js/chunk.[name].[contenthash:10].js",
  },
    optimization: {
    /*
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
    */
      splitChunks: {
        chunks: "all",
      },
      runtimeChunk: {
          name: entry => `runtime-${entry.name}.js`
      },
      minimizer: [
          // 覆盖默认的压缩js配置，自定义压缩方式
        new TerserWebpackPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        }),
        // 压缩css
        new OptimizeCSSAssetsPlugin({})
    ]
    },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [require("postcss-preset-env")],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",// 解决样式文件引入背景图片的问题
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [require("postcss-preset-env")],
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:10].css",
      chunkFilename: "css/chunk.[name].[contenthash:10].css",
    }),
    new CleanWebpackPlugin(),
    ...Object.keys(library).map(name => {
        return new webpack.DllReferencePlugin({
        //   context: ".",
          manifest: path.join(__dirname,"../dll", `${name}-manifest.json`)
    })})
  ],
});

```

`dll.config.js`

```javascript
module.exports =  {
    "vue_vendor": ["vue/dist/vue.esm.js", 'vue-router', 'vuex'],
}
```

###### **webpack.dll.conf.js**

`webpack.dll.conf.js`

```javascript
const dllConfig = require('./dll.config')
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const dllPath = "dll";
module.exports = {
    mode:"production",
    entry: {
        ...dllConfig 
    },
    output: {
        path: path.join(__dirname, "../", dllPath),
        filename: "dll.[name].js",
        library: "[name]_[hash]"
    },
    plugins: [
        // 清除之前的dll文件
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
          path: path.join(__dirname, "../", dllPath, "[name]-manifest.json"),
          name: "[name]_[hash]"
        })
      ]
}
```

