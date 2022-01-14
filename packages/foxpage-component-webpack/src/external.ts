import { ExternalsObjectElement } from 'webpack';
import { BuildMode } from './types';

const BaseExternal: ExternalsObjectElement = {
  react: {
    root: 'React',
    commonjs: 'react',
    commonjs2: 'react',
    amd: 'react',
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs: 'react-dom',
    commonjs2: 'react-dom',
    amd: 'react-dom',
  },
  '@foxpage/foxpage-component-context': {
    root: 'FoxpageComponentContext',
    commonjs: '@foxpage/foxpage-component-context',
    commonjs2: '@foxpage/foxpage-component-context',
    amd: '@foxpage/foxpage-component-context',
  },
};

const ProdExternal: ExternalsObjectElement = {};

const ModeExternalMap: Partial<Record<Partial<BuildMode>, ExternalsObjectElement>> = {
  production: ProdExternal,
};

export const getWebpackExternalConfig = (mode: BuildMode): ExternalsObjectElement => {
  const modeExternals = ModeExternalMap[mode] || {};
  return Object.assign(BaseExternal, modeExternals);
};
