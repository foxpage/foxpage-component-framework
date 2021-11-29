const pkg = require('./package');

module.exports = (api) => {
  const esModule = !!process.env.ES || !!process.env.BUILD_DIST;
  const presetEnvConfig = {
    useBuiltIns: false,
    // corejs: 3,
    modules: esModule ? false : 'commonjs',
    loose: true,
    targets: {
      browsers: [
        "last 5 Chrome versions",
        "last 5 Android versions",
        "last 5 Firefox versions",
        "last 2 iOS versions",
        "ie 11"
      ],
    },
    // debug: true,
  };
  const disableBabelEnv = !!process.env.DISABLE_BABEL_ENV;

  api.cache(false);

  return {
    presets: [
      !disableBabelEnv && [require('@babel/preset-env'), presetEnvConfig],
      require('@babel/preset-react'),
      require('@babel/preset-typescript'),
    ].filter(Boolean),
    plugins: [
      [
        require('babel-plugin-transform-define'),
        {
          __FOXPAGE_COMPONENT_CONTEXT_VERSION__: pkg.version,
        }
      ]
    ]
  }
}
