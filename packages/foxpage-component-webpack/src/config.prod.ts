import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack, { Configuration } from 'webpack';
import { join } from 'path';
import { ModeFileNameMap, webpackBaseConfig, WebpackBaseConfigOption } from './config.base';

export interface WebpackProductionOption extends WebpackBaseConfigOption {
  library: string;
  analyze?: boolean;
}

export const webpackProdConfig = (
  context: string,
  { analyze = false, ...opt }: WebpackProductionOption,
): Configuration => {
  const { outputPath, outputFileName, library, useFileHash } = opt;
  const fileName =
    outputFileName ||
    (useFileHash && `${ModeFileNameMap['production']}.[contenthash].js`) ||
    `${ModeFileNameMap['production']}.js`;
  const styleFileName =
    (useFileHash && `${ModeFileNameMap['prodStyle']}.[contenthash].css`) || `${ModeFileNameMap['prodStyle']}.css`;
  const prodConfig: webpack.Configuration = {
    mode: 'production',
    target: 'web',
    devtool: false,
    output: {
      path: outputPath || join(context, 'dist'),
      filename: fileName,
      library: library,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    optimization: {
      minimize: true,
    },
    plugins: [
      analyze && new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({
        filename: styleFileName,
      }),
    ].filter(Boolean) as webpack.Plugin[],
  };
  return merge.smart(
    webpackBaseConfig(context, 'production', {
      extractCSS: true,
      useStyleLoader: false,
      ...opt,
    }) as any,
    prodConfig as any,
  ) as Configuration;
};
