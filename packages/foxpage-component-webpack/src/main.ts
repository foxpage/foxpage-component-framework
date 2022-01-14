import webpack from 'webpack';
import { logger } from '@foxpage/foxpage-component-shared';
import { WebpackBaseConfigOption } from './config.base';
import { webpackProdConfig } from './config.prod';
import { webpackNodeConfig } from './config.node';
import { webpackDebugConfig } from './config.debug';
import { webpackEditorConfig } from './config.editor';
import { webpackStyleConfig } from './config.style';
import { webpackUmdProdConfig } from './config.umd.prod';
import { webpackUmdDevConfig } from './config.umd.dev';
import { webpackCjsProdConfig } from './config.cjs.prod';
import { webpackCjsDevConfig } from './config.cjs.dev';

import { BuildMode } from './types';

const WEBPACK_CONFIG_MAP: Record<
  BuildMode,
  (context: string, opt: WebpackBaseConfigOption) => webpack.Configuration | undefined
> = {
  production: webpackProdConfig as any,
  debug: webpackDebugConfig as any,
  node: webpackNodeConfig as any,
  editor: webpackEditorConfig as any,
  style: webpackStyleConfig as any,
  umd_prod: webpackUmdProdConfig as any,
  umd_dev: webpackUmdDevConfig as any,
  cjs_prod: webpackCjsProdConfig as any,
  cjs_dev: webpackCjsDevConfig as any,
};

export const getModeWebpackConfig = (
  mode: BuildMode,
  context: string,
  opt: WebpackBaseConfigOption,
): webpack.Configuration | undefined => {
  const fn = WEBPACK_CONFIG_MAP[mode];
  const cfg = fn(context, opt);

  if (!cfg) {
    return;
  }

  // valid entry
  if (typeof cfg.entry === 'object' && Object.keys(cfg.entry).length === 0) {
    logger.warn('skip "%s" mode build, because not find available entry', mode);
    return;
  }

  return cfg;
};
