import { Configuration } from 'webpack';
import { configWebpack } from './webpack';
import { StorybookPreset } from './interfaces';

export const createStorybookMainConfig = () => {
  const preset: StorybookPreset = {
    // eslint-disable-next-line prettier/prettier
    addons: [
      '@foxpage/foxpage-component-editor-storybook-addon/lib/register',
    ],

    webpackFinal: async (config: Configuration) => {
      const cfg = configWebpack({ config, aliasLocal: true });
      return cfg;
    },
  };

  return preset;
};
