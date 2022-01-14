import merge from 'webpack-merge';
import webpack, { Configuration } from 'webpack';
import { join } from 'path';
import { webpackBaseConfig, WebpackBaseConfigOption } from './config.base';
import { ModeFileNameMap } from './constants';
export interface WebpackDebugOption extends WebpackBaseConfigOption {
  library: string;
}

export const webpackUmdDevConfig = (context: string, opt: WebpackDebugOption): Configuration => {
  const { outputPath, outputFileName, library, useFileHash } = opt;
  const fileName =
    outputFileName ||
    (useFileHash && `${ModeFileNameMap['umd_dev']}.[contenthash].js`) ||
    `${ModeFileNameMap['umd_dev']}.js`;
  const debugConfig: webpack.Configuration = {
    devtool: false,
    mode: 'development',
    target: 'web',
    output: {
      path: outputPath || join(context, 'umd'),
      filename: fileName,
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
    ].filter(Boolean) as webpack.Plugin[],
  };
  return merge.smart(
    webpackBaseConfig(context, 'umd_dev', {
      ...opt,
      // umd_dev: force to set option
      extractCSS: false,
      useStyleLoader: false,
    }) as any,
    debugConfig as any,
  ) as Configuration;
};
