const fs = require('fs');
const { join } = require('path');

const defaultPolyfills = [
  // promise polyfill alone doesn't work in IE,
  // needs this as well
  'es.array.iterator',
  // this is required for webpack code splitting, vuex etc.
  'es.promise',
  // this is needed for object rest spread support in templates
  // as vue-template-es2015-compiler 1.8+ compiles it to Object.assign() calls.
  'es.object.assign',
];

/**
 *
 * @param {import('./interfaces').Options['browserslist']} browserList
 * @param {'production' | 'development'} env
 */
function getBrowserList(browserList, env) {
  if (typeof browserList === 'object' && 'production' in browserList) {
    return browserList[env] || browserList.production;
  } else if (Array.isArray(browserList)) {
    return browserList;
  } else if (typeof browserList === 'string') {
    return browserList;
  }
}

/**
 *
 * @param {'production' | 'development'} env
 * @returns {undefined | string | string[]}
 */
function getBrowserListFromUserProject(env) {
  try {
    const cwd = process.cwd();
    const pkgJson = join(cwd, 'package.json');
    if (fs.existsSync(pkgJson)) {
      const pkg = require(pkgJson);
      const browserList = pkg.browserslist;
      return getBrowserList(browserList, env);
    }
  } catch (error) {
    error;
  }
}

const defaultDevelopmentBrowserList = ['last 5 chrome version', 'last 5 firefox version', 'last 1 safari version'];

const defaultProductionBrowserList = ['last 2 versions', 'Firefox ESR', 'not dead', "not ie <= 10"];

/**
 *
 * @param {import('./interfaces').Options} options
 */
function getFoxpageComponentBabelConfig(options = {}) {
  const {
    by,
    env,
    mode: buildMode,
    debug = false,
    developIE = false,
    esModule = false,
    loose = false,
    spec = false,
    modules,
    presetEnvOptions: presetEnv = {},
    style = false,
    browserslist,
  } = options;
  const isBuildByWebpack = by === 'webpack';
  const isBuildProduction = buildMode === 'production';
  const isBuildDebug = buildMode === 'debug';
  const isBuildNode = buildMode === 'node';
  const isBuildEditor = buildMode === 'editor';

  const isProduction = env === 'production';
  const isDevelopment = env === 'development';
  const isTest = env === 'test';
  const browserListFromPackageJson = getBrowserListFromUserProject(env);
  const browserListFromOption = getBrowserList(browserslist, env);

  /** @type {import('./interfaces').BabelPresetEnvOptions['modules']} */
  const defaultModules = esModule ? false : isBuildByWebpack ? false : 'cjs';

  const presets = [];
  const plugins = [];

  const presetEnvCommonOptions = {
    corejs: 3,
    // TODO: use "usage" may better?
    // @see https://babeljs.io/docs/en/babel-preset-env#usebuiltins
    useBuiltIns: 'entry',
    debug,
    loose,
    spec,
    modules: typeof modules !== 'undefined' ? modules : defaultModules,
  };

  // for production
  const prodEnvOptions = {
    ...presetEnvCommonOptions,
    targets: {
      browsers: browserListFromOption || browserListFromPackageJson || defaultProductionBrowserList,
    },
    ...presetEnv,
  };

  // debug use same option with production
  // debug just not minify and get more warning message
  const debugEnvOptions = {
    ...prodEnvOptions,
  };

  // for local development
  const devEnvOptions = {
    ...presetEnvCommonOptions,
    loose: true,
    targets: developIE
      ? { ie: 11 }
      : { browsers: browserListFromOption || browserListFromPackageJson || defaultDevelopmentBrowserList },
    ...presetEnv,
  };

  // for SSR
  const nodeEnvOptions = {
    ...presetEnvCommonOptions,
    loose: true,
    targets: {
      node: '8.9.4',
    },
    ...presetEnv,
  };

  // for foxpage editor
  const editorEnvOption = {
    ...presetEnvCommonOptions,
    loose: true,
    targets: {
      browsers: 'last 5 Chrome versions',
    },
    ...presetEnv,
  };

  /** @type {Record<import('./interfaces').Mode, import('./interfaces').BabelPresetEnvOptions>} */
  const mapModeToEnvOption = {
    production: prodEnvOptions,
    debug: debugEnvOptions,
    node: nodeEnvOptions,
    editor: editorEnvOption,
  };

  // @see https://babeljs.io/docs/en/babel-preset-env
  /** @type {import('./interfaces').BabelPresetEnvOptions} */
  const presetEnvOptions = mapModeToEnvOption[buildMode] || (isDevelopment ? devEnvOptions : prodEnvOptions);

  if (debug) {
    console.log('babel preset-env options:', presetEnvOptions);
  }

  presets.push(require('@babel/preset-typescript'), require('@babel/preset-react'), [
    require('@babel/preset-env'),
    presetEnvOptions,
  ]);

  plugins.push(
    [require('@babel/plugin-proposal-private-methods'), { loose }],
    [require('@babel/plugin-proposal-class-properties'), { loose }],
    require('@babel/plugin-proposal-export-namespace-from'),
    require('@babel/plugin-proposal-export-default-from'),
    require('@babel/plugin-proposal-numeric-separator'),
    require('@babel/plugin-syntax-dynamic-import'),
    require('@babel/plugin-proposal-throw-expressions'),
    require('@babel/plugin-transform-runtime'),
    [require('@babel/plugin-proposal-optional-chaining'), { loose }],
    [require('@babel/plugin-proposal-nullish-coalescing-operator'), { loose }],
    [
      require('babel-plugin-minify-replace'),
      {
        replacements: [
          {
            identifierName: '__DEV__',
            replacement: {
              type: 'booleanLiteral',
              value: true,
            },
          },
        ],
      },
    ],
  );

  if (isTest) {
    presets.push(require('babel-preset-power-assert'));
  }

  // remove console & prop-types in "production"
  if (isBuildByWebpack && (isProduction || isBuildProduction)) {
    plugins.push(require('babel-plugin-transform-react-remove-prop-types'));
    plugins.push(require('babel-plugin-transform-remove-console'));
  } else if (isBuildNode) {
    plugins.push(require('babel-plugin-transform-remove-console'));
  }

  if (style) {
    /** @type {import('./plugins/transform-style-import').TransformStyleImportPluginOptions} */
    const transformStylePluginOption =
      style === 'remove'
        ? { removeStyleImport: true }
        : undefined;
    if (transformStylePluginOption) {
      plugins.push([require('./plugins/transform-style-import'), transformStylePluginOption]);
    }
  }

  return {
    presets,
    plugins,
  };
}

module.exports = {
  getFoxpageComponentBabelConfig,
};
