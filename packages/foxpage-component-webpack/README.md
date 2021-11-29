# @foxpage/foxpage-component-webpack

为 `@foxpage/foxpage-cli` 项目提供 webpack 配置数据

## Usage

你无需手动使用, `foxpage` 指令工具会帮你做所有的事情

## Customer config

在组件的 `production` `node` `debug` `editor` 的构建流程(mode)中, 用户可以在 `<root>/.foxpage/webpack.js` 文件中配置所有组件通用的 `webpack` 构建配置, 也可以在 `<root>/packages/<package>/.foxpage/webpack.js` 文件中为某个组件单独设置 `webpack` 构建配置 (一般情况下用户只需要额外配置 `externals` 信息用于资源优化)

例如, 组件构建时需要移除掉 `antd` 的资源（在 foxpage 平台上注册时 添加 dependencies 指定依赖 antd 的资源, 在加载组件资源前会先加载组件依赖的资源）:

``` js
// '<root>/.foxpage/webpack.js' or '<root>/packages/<package>/.foxpage/webpack.js'
const webpackFinal = (mode, config) => {
  if (['debug', 'production', 'node'].includes(mode)) {
    config.externals['antd'] = {
      root: "antd",
      commonjs: "antd",
      commonjs2: "antd",
      amd: 'antd',
    };
  }
  return config;
};

module.exports = webpackFinal;
```
