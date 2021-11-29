const { getFoxpageComponentBabelConfig } = require('./main');

module.exports = (context, options = {}) => {
  // cli 构建时会设置 BUILD_STYLE, BUILD_ES_MODULE
  const style = process.env.BUILD_STYLE;

  // Gets the ENV parameter set by the foxpage cli tool
  const isDebug = !!process.env.DEBUG_BABEL;
  const isDevelopIE = !!process.env.DEVELOP_IE;

  const config = getFoxpageComponentBabelConfig({
    mode: process.env.BUILD_MODE,
    env: process.env.NODE_ENV,
    by: !!process.env.BUILD_MODE ? 'webpack' : undefined,
    esModule: !!process.env.BUILD_ES_MODULE,
    style: style === 'false' ? false : style,
    developIE: isDevelopIE,
    debug: isDebug,
    presetEnvOptions: options.presetEnv,
    ...options,
  });

  return config;
}
