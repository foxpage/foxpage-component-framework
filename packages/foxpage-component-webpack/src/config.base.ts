import FriendlyErrorsPlugin from '@soda/friendly-errors-webpack-plugin';
import path from 'path';
import webpack, { Plugin } from 'webpack';
import WebpackAssetsManifest, { Options as ManifestOptionsType } from 'webpack-assets-manifest';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { getStyleLoaderRule, getScriptLoaderRule } from './loader';
import { BuildMode } from './types';
import { findEntry, FindEntryOptions } from './utils';
import { getWebpackExternalConfig } from './external';
import { ModeFileNameMap } from './constants';

export interface WebpackBaseConfigOption extends FindEntryOptions {
  // use inside
  publicPath?: string;
  extractCSS?: boolean;
  useStyleLoader?: boolean;
  useDefaultEntry?: boolean;
  fileSizeLimit?: number;
  useManifest?: boolean;
  manifest?: {
    output?: string;
    filename?: string;
    customize?: ManifestOptionsType['customize'];
  };
  useFileHash?: boolean;
  useAssetsHash?: boolean;
  useProgressPlugin?: boolean;

  // use by other target mode
  indexFileNames?: string[];
  library?: string;
  outputPath?: string;
  outputFileName?: string;
  analyze?: boolean;
}

export const webpackBaseConfig = (context: string, mode: BuildMode, opt: WebpackBaseConfigOption) => {
  const {
    publicPath,
    extractCSS = true,
    useStyleLoader = false,
    useDefaultEntry = true,
    fileSizeLimit = 8192,
    useManifest = false,
    manifest,
    useFileHash,
    useAssetsHash,
    useProgressPlugin = false,
    analyze = false,
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
  const {
    output: manifestOutput = '',
    filename: manifestFileName = 'manifest.json',
    customize: manifestCustomize,
  } = manifest || {};
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
                publicPath: publicPath || '../',
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
                limit: fileSizeLimit,
                name: `assets/${useFileHash || useAssetsHash ? '[contenthash]' : '[name]'}.[ext]`,
                publicPath: publicPath || '../',
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
      analyze && (process.env.USE_BUNDLE_ANALYZER = 'true') && new BundleAnalyzerPlugin({ analyzerPort: 'auto' }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify('production'),
        NODE_ENV: JSON.stringify('production'),
      }),
      useManifest &&
        new WebpackAssetsManifest({
          output: manifestOutput ? path.join(manifestOutput, manifestFileName) : manifestFileName,
          merge: true,
          customize: manifestCustomize,
        }),
      useProgressPlugin && new webpack.ProgressPlugin(),
    ].filter(Boolean) as Plugin[],
  };
  return webpackConfig;
};
