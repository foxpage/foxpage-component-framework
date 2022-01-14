import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { Configuration } from 'webpack';
import { join } from 'path';
import { webpackBaseConfig, WebpackBaseConfigOption } from './config.base';
import { ModeFileNameMap } from './constants';

export interface WebpackProductionOption extends WebpackBaseConfigOption {
  library: string;
}

export const webpackUmdProdConfig = (context: string, opt: WebpackProductionOption): Configuration => {
  const { outputPath, outputFileName, library, useFileHash } = opt;
  const fileName =
    outputFileName ||
    (useFileHash && `${ModeFileNameMap['umd_prod']}.[contenthash].js`) ||
    `${ModeFileNameMap['umd_prod']}.js`;
  const styleFileName =
    (useFileHash && `${ModeFileNameMap['umd_prod_style']}.[contenthash].css`) ||
    `${ModeFileNameMap['umd_prod_style']}.css`;
  const prodConfig: webpack.Configuration = {
    mode: 'production',
    target: 'web',
    devtool: false,
    output: {
      path: outputPath || join(context, 'umd'),
      filename: fileName,
      library: library,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    optimization: {
      minimize: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: styleFileName,
      }),
    ].filter(Boolean) as webpack.Plugin[],
  };
  return merge.smart(
    webpackBaseConfig(context, 'umd_prod', {
      extractCSS: true,
      useStyleLoader: false,
      ...opt,
      // force to set hack customize;
      manifest: {
        customize(entry) {
          if (entry.key === `${ModeFileNameMap['umd_prod']}.css`) {
            return {
              ...entry,
              key: `${ModeFileNameMap['umd_prod_style']}.css`,
            };
          }
          return entry;
        },
      },
    }) as any,
    prodConfig as any,
  ) as Configuration;
};
