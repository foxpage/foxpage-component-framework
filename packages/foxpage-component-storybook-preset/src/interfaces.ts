import { Configuration } from 'webpack';

// @see
export interface StorybookPreset {
  // glob syntax
  stories?: string[];
  addons?: string[];

  webpackFinal: (config: Configuration) => Promise<Configuration>;
}
