export interface PrivateOption {
  mode?: 'debug' | 'production' | 'node' | 'editor' | 'style';
  env?: 'production' | 'development' | 'test';
  by?: 'webpack';
  // handle style and asset(like: font, image, etc) import
  // useful for build ssr bundle
  // "remove": remove all style & asset import
  style?: false | 'remove';
  esModule?: boolean;
}
export interface PublicOptions {
  // custom config
  // @see https://github.com/ai/browserslist
  browserslist?: string | string[] | { development: string | string[]; production: string | string[] };

  // debug babel preset env
  debug?: boolean;

  // if set, preset env targets will be "{ ie: 11 }";
  developIE?: boolean;

  // pass option to babel-preset-env
  // @see https://babeljs.io/docs/en/babel-preset-env
  loose?: boolean;
  spec?: boolean;
  modules?: BabelPresetEnvOptions['modules'];
  presetEnvOptions?: BabelPresetEnvOptions;
}

export interface Options extends PublicOptions, PrivateOption {}

export type Mode = Options['mode'];

// @see https://babeljs.io/docs/en/babel-preset-env
export interface BabelPresetEnvOptions {
  targets?: string | string[] | Record<string, string> | BabelPresetEnvTarget;
  bugfixes?: boolean;
  spec?: boolean;
  loose?: boolean;
  // default false
  modules?: 'amd' | 'umd' | 'systemjs' | 'commonjs' | 'cjs' | 'auto' | false;
  debug?: boolean;
  include?: Array<string | RegExp>;
  exclude?: Array<string | RegExp>;
  // default false;
  useBuiltIns?: 'usage' | 'entry' | false;
  corejs?: 2 | 3 | { version: 2 | 3; proposals: boolean };
  forceAllTransforms?: boolean;
  configPath?: string;
  shippedProposals?: boolean;
}

export interface BabelPresetEnvTarget {
  esmodules?: boolean;
  node?: string | 'current' | true;
  safari?: string | 'tp';

  // @see https://github.com/ai/browserslist
  browsers?: string | Array<string>;
}

export interface BabelConfig {
  plugins?: any[];
  presets?: any[];
}
