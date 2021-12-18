import FriendlyErrorsPlugin from '@soda/friendly-errors-webpack-plugin';
import { join } from 'path';
import webpack, { Plugin } from 'webpack';
import WebpackAssetsManifest from 'webpack-assets-manifest';

import { getStyleLoaderRule, getScriptLoaderRule } from './loader';
import { BuildFoxpageMode } from './types';
import { findEntry, FindEntryOptions } from './utils';
import { getWebpackExternalConfig } from './external';

export interface WebpackBaseConfigOption extends FindEntryOptions {
  library?: string;
  version?: string;
  outputPath?: string;
  outputFileName?: string;
  publicPath?: string;
  extractCSS?: boolean;
  useStyleLoader?: boolean;
  useDefaultEntry?: boolean;
  fileSizeLimit?: number;
  useManifest?: boolean;
  useFileHash?: boolean;
  useAssetsHash?: boolean;
  useProgressPlugin?: boolean;
}

export const ModeFileNameMap: Record<BuildFoxpageMode | 'prodStyle', string> = {
  production: 'umd/production.min',
  prodStyle: 'umd/style',
  debug: 'umd/development',
  node: 'cjs/production',
  editor: 'umd/editor',
};

export const webpackBaseConfig = (context: string, mode: BuildFoxpageMode, opt: WebpackBaseConfigOption) => {
  const {
    publicPath,
    extractCSS = true,
    useStyleLoader = false,
    useDefaultEntry = true,
    fileSizeLimit: fileLimit = 8192,
    useManifest,
    useFileHash,
    useAssetsHash,
    useProgressPlugin = false,
  } = opt || {};
  const getEntry = (_opt: WebpackBaseConfigOption) => {
    const entryPath = findEntry(context, _opt);
    if (!entryPath) {
      throw new Error(`${context} can't find entry`);
    }
    const key = ModeFileNameMap[mode];
    if (key) {
      return {
        [`${key}`]: entryPath,
      };
    }
    return entryPath;
  };
  const webpackConfig: webpack.Configuration = {
    entry: useDefaultEntry ? getEntry(opt) : undefined,
    context,
    output: {
      publicPath,
    },
    optimization: {
      sideEffects: true,
    },
    externals: getWebpackExternalConfig(mode),
    resolve: {
      alias: undefined,
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css', '.less', '.scss'],
    },
    module: {
      rules: [
        getScriptLoaderRule(),
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: `assets/${useFileHash || useAssetsHash ? '[contenthash]' : '[name]'}.[ext]`,
                publicPath,
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
                limit: useStyleLoader ? Number.MAX_SAFE_INTEGER : fileLimit,
                name: `assets/${useFileHash || useAssetsHash ? '[contenthash]' : '[name]'}.[ext]`,
                publicPath,
              },
            },
          ],
        },
        getStyleLoaderRule('less', { extract: extractCSS, styleLoader: useStyleLoader }),
        getStyleLoaderRule('sass', { extract: extractCSS, styleLoader: useStyleLoader }),
        getStyleLoaderRule('css', { extract: extractCSS, styleLoader: useStyleLoader }),
      ],
    },
    plugins: [
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Compiler "${mode}" mode success`],
        },
      }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify('production'),
        NODE_ENV: JSON.stringify('production'),
      }),
      useManifest &&
        new WebpackAssetsManifest({
          output: join(context, `dist/manifest.json`),
          merge: true,
          customize(entry) {
            if (entry.key === `${ModeFileNameMap['production']}.css`) {
              return {
                ...entry,
                key: `${ModeFileNameMap['prodStyle']}.css`,
              };
            }
            return entry;
          },
        }),
      useProgressPlugin && new webpack.ProgressPlugin(),
    ].filter(Boolean) as Plugin[],
  };
  return webpackConfig;
};
