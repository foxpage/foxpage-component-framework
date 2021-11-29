import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries';
import { join } from 'path';
import webpack from 'webpack';
import { logger, resolveExtensions } from '@foxpage/foxpage-component-shared';
import { getStyleLoaderRule, StyleLoaderOptions } from './loader';
import { findEntry } from './utils';
import { WebpackBaseConfigOption } from './config.base';

export type WebpackStyleOption = WebpackBaseConfigOption;

export const webpackStyleConfig = (context: string, opt: WebpackStyleOption) => {
  const entryPath = findEntry(context, {
    indexFileNames: resolveExtensions(['src/index'], ['.less', '.css', '.scss']),
  });
  if (!entryPath) {
    logger.warn(`context "${context}" can't find style entry, ignore.`);
    return;
  }
  const { outputPath, outputFileName, useAssetsHash } = opt;

  const option: StyleLoaderOptions = {
    extract: true,
    styleLoader: false,
  };

  const styleConfig: webpack.Configuration = {
    mode: 'production',
    target: 'web',
    entry: entryPath,
    output: {
      path: outputPath || join(context, 'dist-style'),
    },
    resolve: {
      extensions: ['.css', '.less', '.scss'],
    },
    module: {
      rules: [
        getStyleLoaderRule('less', option),
        getStyleLoaderRule('sass', option),
        getStyleLoaderRule('css', option),
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: `${useAssetsHash ? '[contenthash]' : '[name]'}.[ext]`,
                outputPath: './assets',
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|webp)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: `${useAssetsHash ? '[contenthash]' : '[name]'}.[ext]`,
                outputPath: './assets',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: outputFileName || 'index.css',
      }),
    ].filter(Boolean) as webpack.Plugin[],
  };
  return styleConfig;
};
