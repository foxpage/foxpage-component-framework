# @foxpage/eslint-config-foxpage-component

为 `foxpage-component-boilerplate` 项目提供 `eslint` 相关配置.

## Usage

在项目根目录的 `.eslintrc` 文件内配置:

``` json
{
  "root": true,
  "extends": "@foxpage/eslint-config-foxpage-component",
  "rules": {}
}
```

### Customer Rules

添加自定义 `ESLint rule`:

``` json
{
  "root": true,
  "extends": "@foxpage/eslint-config-foxpage-component",
  "rules": {
    "no-unused-vars": [1]
  }
}
```
