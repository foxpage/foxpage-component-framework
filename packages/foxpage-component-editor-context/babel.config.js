module.exports = api => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isTest = process.env.NODE_ENV === 'test';

  api.assertVersion('^7.0');
  api.cache.using(() => !isProduction);

  const presetEnvConfig = {
    useBuiltIns: 'entry',
    corejs: 2,
    modules: isProduction ? false : 'commonjs',
    // debug: true,
  };

  return {
    presets: [
      isTest && require('babel-preset-power-assert'),
      require('@babel/preset-env').default(api, presetEnvConfig),
      require('@babel/preset-react'),
    ].filter(Boolean),
    plugins: [
      [
        require('@babel/plugin-proposal-decorators'),
        {
          legacy: true,
        },
      ],
      [
        require('@babel/plugin-proposal-class-properties'),
        {},
      ],
      require('@babel/plugin-proposal-export-default-from'),
      require('@babel/plugin-proposal-export-namespace-from'),
      require('@babel/plugin-proposal-json-strings'),
      require('@babel/plugin-proposal-numeric-separator'),
      require('@babel/plugin-proposal-throw-expressions'),
      require('@babel/plugin-syntax-dynamic-import'),
      require('@babel/plugin-transform-modules-commonjs'),
    ].filter(Boolean),
  };
};
