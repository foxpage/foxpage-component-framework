const path = require('path');
const { configWebpack } = require('@foxpage/foxpage-component-storybook-preset/lib/webpack');
const babelConfigPath = path.join(__dirname, './babel.config.js');

module.exports = {
  stories: ['../packages/foxpage-component-editor-widgets/**/*.stories.tsx'],
  webpackFinal: async config => {
    const webpackConfig = configWebpack({ config, aliasLocal: true, babelConfigPath });
    return webpackConfig;
  },
};
