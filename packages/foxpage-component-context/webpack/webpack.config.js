const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { join } = require('path');
const pkg = require('../package.json');

const DIST_DIR = join(__dirname, '..', 'dist');
const SRC_DIR = join(__dirname, '..', 'src');
const needAnalyze = process.env.ANALYZE;
const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const webpackConfig = (
  isProd,
  {
    analyze = false,
    externalL10n = false,
  } = {},
) => {
  /** @type {import('webpack').Configuration} */
  const config = {
    devtool: false,
    context: join(__dirname, '..'),
    mode: isProd ? 'production' : 'development',
    entry: {
      entry: join(SRC_DIR, 'index.ts'),
    },
    output: {
      path: DIST_DIR,
      publicPath: '',
      libraryTarget: 'umd',
      library: 'FoxpageComponentContext',
      umdNamedDefine: true,
      filename: isProd ? 'foxpage-component-context.min.js' : 'foxpage-component-context.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      symlinks: true,
    },
    externals: {
      react: {
        umd: 'react',
        amd: 'react',
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React',
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        }
      ],
    },
    plugins: [
      needAnalyze && new BundleAnalyzerPlugin(),
      !isProd && new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        __FOXPAGE_COMPONENT_CONTEXT_VERSION__: pkg.version || '',
      }),
    ].filter(Boolean),
  };
  return config;
};


if (needAnalyze) {
  module.exports = webpackConfig(true, { analyze: true, externalL10n: true });
} else if (isDev) {
  module.exports = webpackConfig(false, { analyze: false });
} else {
  module.exports = [
    webpackConfig(false, { externalL10n: true }),
    webpackConfig(true, { externalL10n: true })
  ];
}
