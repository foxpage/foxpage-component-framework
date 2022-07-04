import fs from 'fs';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { paths, findPath, readPackageInfo, logger } from '@foxpage/foxpage-component-shared';

export interface StyleLoaderOptions {
  sourceMap?: boolean;
  extract?: boolean;
  styleLoader?: boolean;
}

export interface BabelLoaderOptions {
  presets?: any[];
  plugins?: any[];
  configFile?: string;
}

function findPostCssConfig() {
  const configFilePath = findPath(paths.root, ['post.config.js']);
  const configInPkgJson = readPackageInfo(paths.root, 'postcss');
  return !!configFilePath || !!configInPkgJson;
}

export const getStyleLoaderRule = (
  type: 'less' | 'sass' | 'css',
  { sourceMap = false, extract = false, styleLoader = false }: StyleLoaderOptions = {},
  customRule: Partial<webpack.RuleSetRule> = {},
) => {
  let regex = /\.(css)$/;
  const loaders: webpack.RuleSetLoader[] = [
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap,
        importLoaders: type === 'css' ? 1 : 2,
      },
    },
  ];

  if (findPostCssConfig()) {
    loaders.push({
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap,
      },
    });
  }

  switch (type) {
    case 'less':
      regex = /\.less$/;
      loaders.push({
        loader: require.resolve('less-loader'),
        options: {
          sourceMap,
        },
      });
      break;
    case 'sass':
      (regex = /\.(scss|sass)$/),
        loaders.push({
          loader: require.resolve('sass-loader'),
          options: {
            sourceMap,
            implementation: require('sass'),
          },
        });
      break;
    case 'css':
      regex = /\.(css)$/;
  }

  const rule: webpack.RuleSetRule = {
    test: regex,
    loaders,
    ...customRule,
  };

  if (styleLoader) {
    loaders.unshift({
      loader: require.resolve('style-loader'),
    });
  } else if (extract) {
    loaders.unshift({
      loader: MiniCssExtractPlugin.loader as any,
    });
  } else {
    while (loaders.length) {
      loaders.pop();
    }
    loaders.push({
      loader: require.resolve('ignore-loader'),
    });
  }

  return rule;
};

interface GetScriptLoaderRuleProps {
  babelConfigPath?: string;
}

export const getScriptLoaderRule = (props: GetScriptLoaderRuleProps = {}) => {
  const { babelConfigPath = paths.babelConfigJS } = props;
  if (!fs.existsSync(babelConfigPath)) {
    logger.error(`The path of babel config is error: ${babelConfigPath}! please check it!!!`);
    process?.exit?.(1);
  }
  const rule: webpack.RuleSetRule = {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules[/\\\\](?!(swr))/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          configFile: babelConfigPath,
        },
      },
    ],
  };
  return rule;
};
