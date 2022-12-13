import merge from 'webpack-merge';
import webpack, { Configuration } from 'webpack';
import { join } from 'path';
import { webpackBaseConfig, WebpackBaseConfigOption } from './config.base';
import { ModeFileNameMap } from './constants';

export interface WebpackDebugOption extends WebpackBaseConfigOption {
  library: string;
}

export const webpackDebugConfig = (context: string, opt: WebpackDebugOption): Configuration => {
  const { outputPath, outputFileName, library, useFileHash } = opt;
  const fileName =
    outputFileName ||
    (useFileHash && `${ModeFileNameMap['debug']}.[contenthash].js`) ||
    `${ModeFileNameMap['debug']}.js`;
  const chunkFilename = (useFileHash && `chunk-development-[name].[contenthash].js`) || `chunk-development-[name].js`;
  const debugConfig: webpack.Configuration = {
    devtool: false,
    mode: 'development',
    target: 'web',
    output: {
      path: outputPath || join(context, 'dist'),
      filename: fileName,
      chunkFilename: `umd/${chunkFilename}`,
      library: library,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    optimization: {
      minimize: false,
      namedModules: true,
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin(),
      // set process.env.NODE_ENV to "development" to make some module(like React) load module for development and get more info
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify('development'),
        NODE_ENV: JSON.stringify('development'),
      }),
    ],
  };
  return merge.smart(
    webpackBaseConfig(context, 'debug', {
      ...opt,
      // debug: force to set
      extractCSS: false,
      useStyleLoader: false,
      manifest: {
        customize(entry) {
          if (!entry.key?.startsWith?.('umd/') && !entry.key?.startsWith?.('assets/')) {
            return {
              ...entry,
              key: `umd/chunk-development-${entry.key}`,
            };
          }
          return entry;
        },
      },
    }) as any,
    debugConfig as any,
  ) as Configuration;
};
