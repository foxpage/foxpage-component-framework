# @foxpage/foxpage-component-storybook-addon

为 `foxpage-component-boilerplate` 开发组件提供 `storybook` 插件 `preset` 配置

包含 `addon` 预设配置, `webpack` 预设配置, 让用户无需关心内部实现

## Usage

``` js
// .storybook/main.js

module.exports = {
  addons: [
    {
      name: '@foxpage/foxpage-component-storybook-preset/preset',
      options: {},
    },
  ],
  // 可自定义设置
  // webpackFinal: async config => {
  //   return config;
  // },
};

```
