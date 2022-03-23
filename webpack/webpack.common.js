const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      api: path.resolve(__dirname, '..', './src/api/'),
      apps: path.resolve(__dirname, '..', './src/apps/'),
      assets: path.resolve(__dirname, '..', './src/assets/'),
      components: path.resolve(__dirname, '..', './src/components/'),
      contexts: path.resolve(__dirname, '..', './src/contexts/'),
      hooks: path.resolve(__dirname, '..', './src/hooks/'),
      pages: path.resolve(__dirname, '..', './src/pages/'),
      pagesComponents: path.resolve(__dirname, '..', './src/pagesComponents/'),
      types: path.resolve(__dirname, '..', './src/types/'),
      utils: path.resolve(__dirname, '..', './src/utils/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
  ],
  stats: 'errors-only',
}
