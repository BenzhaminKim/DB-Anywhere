// 참고 문서 :
// https://velog.io/@jjunyjjuny/React-TS-boilerplate-%EC%A0%9C%EC%9E%91%EA%B8%B0-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%84%B1
//
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const isDevelopment = process.env.NODE_ENV !== 'production';
const PORT = 3000;
const BACKEND_HOST = '3.92.239.238';
const BACKEND_PORT = 32600;

module.exports = (env, argv) => {
  return {
    entry: './src/main.tsx',
    stats: 'minimal',
    output: {
      filename: '[name].[contenthash].js',
      path: path.join(__dirname, '/dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'es2015',
          },
        },
        {
          test: /\.css?$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(webp|jpg|png|jpeg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
          },
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        hash: true,
      }),
    ].filter(Boolean),
    devServer: {
      host: '0.0.0.0',
      allowedHosts: 'all',
      port: PORT,
      open: false,
      hot: true,
      compress: true,
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      static: {
        directory: path.join(__dirname, 'public'),
      },
      proxy: {
        '/v1': {
          target: 'http://' + BACKEND_HOST + ':' + BACKEND_PORT,
          changeOrigin: true,
        },
      },
    },
  };
};
