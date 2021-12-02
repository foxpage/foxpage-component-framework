import { Configuration, RuleSetRule, RuleSetUseItem, DefinePlugin } from 'webpack';
import path from 'path';
import { cloneDeep } from 'lodash';
import { StyleLoaderOptions, getStyleLoaderRule, getScriptLoaderRule } from '@foxpage/foxpage-component-webpack';

export interface StoryBookConfigWebpackOption {
  readonly config: Configuration;
  aliasLocal?: boolean;
  fixEditorStyle?: boolean;
  babelConfigPath?: string;
}

function _fixEditorStyle(rule: RuleSetRule) {
  const isEditor: RuleSetRule['exclude'] = /packages?[/\\\\][^/\\\\]+[/\\\\]editor[/\\\\]/;
  const normalRule: RuleSetRule = {
    ...cloneDeep(rule),
    exclude: isEditor,
  };
  const editorRule: RuleSetRule = {
    ...cloneDeep(rule),
    include: isEditor,
  };
  const editorStyleLoaderRule: RuleSetUseItem = {
    loader: require.resolve('style-loader'),
    options: {
      insert: function (style: any) {
        const doc = window.parent.document;
        const head = (doc.querySelector('head') || doc.getElementsByTagName('head')[0]) as HTMLHeadElement;
        head.appendChild(style);
      },
    },
  };
  const editorStyleUseRules = editorRule.loaders || editorRule.use;
  if (Array.isArray(editorStyleUseRules)) {
    const firstRule = editorStyleUseRules[0];
    const loaderName =
      typeof firstRule === 'object' ? firstRule.loader : typeof firstRule === 'string' ? firstRule : null;
    if (loaderName && loaderName.includes('style-loader')) {
      editorStyleUseRules.shift();
    }
    editorStyleUseRules.unshift(editorStyleLoaderRule);
  }
  const fixRule: RuleSetRule = {
    test: rule.test,
    oneOf: [normalRule, editorRule],
  };
  return fixRule;
}

const generateFoxpageAlias = () => {
  const list = [
    '@foxpage/foxpage-component-context',
    '@foxpage/foxpage-component-editor-context',
    '@foxpage/foxpage-component-storybook-addon',
  ];
  const foxpageAlias: Record<string, string> = {};
  list.forEach((pkg: string) => {
    const absPath = path.dirname(require.resolve(`${pkg}/package.json`));
    if (absPath) {
      foxpageAlias[pkg] = absPath;
    }
  });
  return foxpageAlias;
};

export const configWebpack = ({ config, fixEditorStyle = true, babelConfigPath }: StoryBookConfigWebpackOption) => {
  const styleLoaderOpt: StyleLoaderOptions = {
    sourceMap: true,
    styleLoader: true,
    extract: false,
  };

  const baseExtensions = (config.resolve && config.resolve.extensions) || [];
  const baseModuleRules = (config.module && config.module.rules) || [];
  const foxpageAlias = generateFoxpageAlias();
  config.resolve = {
    ...(config.resolve || {}),
    alias: {
      ...(config.resolve?.alias || {}),
      ...foxpageAlias,
    },
    extensions: [...baseExtensions, '.ts', '.tsx'],
  };

  if (config.module) {
    const cssRuleIndex = baseModuleRules.findIndex(rule => !!(rule.test && rule.test.toString().includes('css')));
    const jsRuleIndex = baseModuleRules.findIndex(rule => !!(rule.test && rule.test.toString().includes('js')));
    if (jsRuleIndex > -1) {
      baseModuleRules[jsRuleIndex] = getScriptLoaderRule({ babelConfigPath });
    }
    if (cssRuleIndex > -1) {
      baseModuleRules.splice(cssRuleIndex, 1);
    }
    const styleRules = (['css', 'less', 'sass'] as const).map(styleType => {
      const baseRule = getStyleLoaderRule(styleType, styleLoaderOpt);
      return fixEditorStyle ? _fixEditorStyle(baseRule) : baseRule;
    });
    config.module.rules = [...baseModuleRules, ...styleRules];
  }

  config.plugins = config.plugins || [];
  config.plugins.push(
    new DefinePlugin({
      __DEV__: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('development'),
      NODE_ENV: JSON.stringify('development'),
    }),
  );

  return config;
};
