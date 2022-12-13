import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { Configuration } from 'webpack';
import { join } from 'path';
import { webpackBaseConfig, WebpackBaseConfigOption } from './config.base';
import { ModeFileNameMap } from './constants';

export interface WebpackProductionOption extends WebpackBaseConfigOption {
  library: string;
  analyze?: boolean;
}

export const webpackProdConfig = (context: string, opt: WebpackProductionOption): Configuration => {
  const { outputPath, outputFileName, library, useFileHash, useStyleLoader = false, extractCSS = true } = opt;
  const fileName =
    outputFileName ||
    (useFileHash && `${ModeFileNameMap['production']}.[contenthash].js`) ||
    `${ModeFileNameMap['production']}.js`;
  const styleFileName =
    (useFileHash && `${ModeFileNameMap['prod_style']}.[contenthash].css`) || `${ModeFileNameMap['prod_style']}.css`;
  const chunkFilename = (useFileHash && `chunk-production-[name].[contenthash].js`) || `chunk-production-[name].js`;
  const prodConfig: webpack.Configuration = {
    mode: 'production',
    target: 'web',
    devtool: false,
    output: {
      path: outputPath || join(context, 'dist'),
      filename: fileName,
      chunkFilename: `umd/${chunkFilename}`,
      library: library,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    optimization: {
      minimize: true,
    },
    plugins: [
      !useStyleLoader &&
        extractCSS &&
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
      // force to set hack customize;
      manifest: {
        customize(entry) {
          let key = entry.key;
          if (key === `${ModeFileNameMap['production']}.css`) {
            key = `${ModeFileNameMap['prod_style']}.css`;
          }
          // handle chunk key
          if (!key?.startsWith?.('umd/') && !key?.startsWith?.('assets/')) {
            key = `umd/chunk-production-${entry.key}`;
          }
          return {
            ...entry,
            key,
          };
        },
      },
    }) as any,
    prodConfig as any,
  ) as Configuration;
};
