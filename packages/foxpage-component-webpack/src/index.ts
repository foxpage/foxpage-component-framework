import './types/webpack-plugin';

export * from './main';
export * from './types';

export { getScriptLoaderRule, getStyleLoaderRule } from './loader';

export type { WebpackBaseConfigOption } from './config.base';
export type { StyleLoaderOptions } from './loader';
