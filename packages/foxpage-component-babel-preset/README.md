# @foxpage/foxpage-component-babel-preset

为 `foxpage-component-boilerplate` 项目提供 `babel` 相关配置.

## Usage

在项目根目录的 `babel.config.js` 文件内配置:

``` js
module.exports = (api) => {
  api.assertVersion("^7.0");
  api.cache(true);

  /** @type {import('@foxpage/foxpage-component-babel-preset/interfaces').Options} */
  const option = {};

  return {
    presets: [
      [require('@foxpage/foxpage-component-babel-preset'), option],
    ],
  };
};

```

## Option

为 `@foxpage/foxpage-component-babel-preset` 配置参数

> 一般无需配置参数, 默认配置以满足, 如果要额外配置, 请注意不要覆盖掉私有参数


options 类型定义如下:

``` ts
interface PublicOptions {
  // custom config browserslist
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
```

其他参数为私用参数用于构建流程，请不要覆盖

options 类型定义 私有参数 如下:

``` ts
interface PrivateOption {
  // private config, don't override it
  mode?: 'debug' | 'production' | 'node' | 'editor' | 'style';
  env?: 'production' | 'development' | 'test';
  by?: 'webpack';
  // handle style and asset(like: font, image, etc) import
  // useful for build ssr bundle
  // "remove": remove all style & asset import
  style?: false | 'remove';
  esModule?: boolean;
}
```
