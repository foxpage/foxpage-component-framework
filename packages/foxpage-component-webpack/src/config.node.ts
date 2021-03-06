import webpack, { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import { clone } from 'lodash';
import { join } from 'path';
import { webpackBaseConfig, WebpackBaseConfigOption } from './config.base';
import { ModeFileNameMap } from './constants';

export const webpackNodeConfig = (context: string, opt: WebpackBaseConfigOption): Configuration => {
  const baseConfig = webpackBaseConfig(context, 'node', opt);

  const jsRule = (baseConfig && baseConfig.module && baseConfig.module.rules[0]) as webpack.RuleSetRule;

  // reset module rules
  const nodeBaseConfig: webpack.Configuration = clone(baseConfig);
  if (nodeBaseConfig.module) {
    nodeBaseConfig.module.rules = [];
  }
  const { outputPath, outputFileName, useFileHash } = opt;
  const fileName =
    outputFileName || (useFileHash && `${ModeFileNameMap['node']}.[contenthash].js`) || `${ModeFileNameMap['node']}.js`;
  const nodeConfig: webpack.Configuration = {
    mode: 'production',
    target: 'node',
    devtool: false,
    output: {
      path: outputPath || join(context, 'dist'),
      filename: fileName,
      libraryTarget: 'commonjs2',
    },
    optimization: {
      minimize: false,
      namedModules: true,
    },
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
