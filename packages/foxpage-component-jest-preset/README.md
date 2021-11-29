# @foxpage/foxpage-component-jest-preset

为 `foxpage-component-boilerplate` 项目提供 `jest` 相关配置.

## Usage

在项目根目录的 `jest.config.js` 文件内配置:

``` js
const { createJestConfig } = require('@foxpage/foxpage-component-jest-preset');

const config = createJestConfig();

module.exports = config;
```

## option

`createJestConfig` 方法参数配置

- `mapLocalPackages`: 是否开启本地 `package` 的 `map` 关系, 会自动通过 `config.moduleNameMapper` 添加所有本地 `package` 的路劲索引而不是通过 `node_modules` 查找. (default: false)

``` js
// 如需开启，请自行配置
const config = createJestConfig({
  mapLocalPackages: true
});
```

## Customer config

可以直接修改 `createJestConfig` 方法生成的 `config` 对象来修改 `jest` 配置数据

``` js
const { createJestConfig } = require('@foxpage/foxpage-component-jest-preset');

const config = createJestConfig();

config.cache = false;
console.log(config);

module.exports = config;
```

## notice

`setupFiles` 的默认配置是 `.foxpage/jest/setup`. 可以直接在 `.foxpage/jest/setup.js` 文件内配置 `jest setup` 逻辑;

`setupFilesAfterEnv` 的默认配置是 `.foxpage/jest/setupEnv`, 且默认开启 `jest-enzyme`. 可以直接在 `.foxpage/jest/setupEnv.js` 文件内配置 `jest setupEnv` 逻辑;

`cacheDirectory` 的默认配置是 `.cache/jest`, 且默认开启 `cache`;
