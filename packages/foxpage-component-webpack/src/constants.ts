import { BuildMode } from './types';

export interface ModeFileNameMap extends Record<BuildMode, string> {
  prod_style: string;
  umd_prod_style: string;
}

export const ModeFileNameMap: ModeFileNameMap = {
  production: 'umd/production.min',
  prod_style: 'umd/style',
  debug: 'umd/development',
  node: 'cjs/production',
  editor: 'umd/editor',
  umd_prod: 'production.min',
  umd_prod_style: 'style',
  umd_dev: 'development',
  cjs_prod: 'production.min',
  cjs_dev: 'development',
  // ignore: special mode
  style: '',
};
