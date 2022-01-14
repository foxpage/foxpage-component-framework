import webpack, { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import { clone } from 'lodash';
import { join } from 'path';
import { webpackBaseConfig, WebpackBaseConfigOption } from './config.base';
import { ModeFileNameMap } from './constants';
import { getScriptLoaderRule } from './loader';

const buildMode = 'cjs_prod';

export const webpackCjsProdConfig = (context: string, opt: WebpackBaseConfigOption): Configuration => {
  const baseConfig = webpackBaseConfig(context, buildMode, opt);

  const jsRule = getScriptLoaderRule();
  // reset module rules
  const nodeBaseConfig: webpack.Configuration = clone(baseConfig);
  if (nodeBaseConfig.module) {
    nodeBaseConfig.module.rules = [];
  }
  const { outputPath, outputFileName, useFileHash } = opt;
  const fileName =
    outputFileName ||
    (useFileHash && `${ModeFileNameMap[buildMode]}.[contenthash].js`) ||
    `${ModeFileNameMap[buildMode]}.js`;
  const nodeConfig: webpack.Configuration = {
    mode: 'production',
    target: 'node',
    devtool: false,
    output: {
      path: outputPath || join(context, 'cjs'),
      filename: fileName,
      libraryTarget: 'commonjs2',
    },
    optimization: {},
    module: {
      rules: [
        jsRule,
        {
          test: /\.(css|less|lcss|scss|sass|jpg|jpeg|png|gif|webp|eot|svg|ttg|woff|woff2)$/,
          use: ['ignore-loader'],
        },
      ],
    },
  };
  return webpackMerge(nodeBaseConfig as any, nodeConfig as any) as Configuration;
};
