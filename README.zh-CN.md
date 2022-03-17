# Foxpage Component Framework

<p align="center">
  <!-- <a href="https://www.foxpage.io/page/#"> -->
    <img src="https://www.foxpage.io/logo.jpg" width="260px" alt="Foxpage logo" />
  <!-- </a> -->
</p>
<h1 align="center">Foxpage</h1>
<h4 align="center">Low-code, made simple and fast</h4>
<!-- <p align="center"><a href="https://www.foxpage.io/page/#/">在线体验</a></p> -->
<br />

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D14.15.1-brightgreen" alt="Node Version" />
  <img src="https://img.shields.io/badge/typescript-%3E%3D4.3.0-brightgreen" alt="Typescript Version" />
  <img src="https://img.shields.io/badge/yarn-1.22.5-blue" alt="Yarn Version" />
  <img src="https://img.shields.io/badge/npm-%3E%3D6.14.x-blue" alt="NPM Version" />
</p>

Foxpage 是一个轻量级前端低代码框架。

Foxpage Component Framework 是一个为组件化服务并集成了组件开发, 构建, 发布流程的前端框架。

[English](./README.md) | 简体中文

## Foxpage Document

<a href="https://www.foxpage.io/#/" target="_blank">阅读foxpage教程</a>

## 项目目录

```txt
<Project Root>
  ├── packages
  |   ├─ eslint-config-foxpage-component          // eslint 配置
  |   ├─ foxpage-component-babel-preset           // babel 配置
  |   ├─ foxpage-component-jest-preset            // jest 配置
  |   ├─ foxpage-component-storybook-addon        // storybook 插件
  |   ├─ foxpage-component-storybook-preset       // storybook 预设配置
  |   ├─ foxpage-component-webpack                // webpack 配置
  |   ├─ foxpage-component-context                // 运行时上下文, 数据中心
  |   ├─ foxpage-component-editor-context         // editor 运行时上下文, 数据中心
  |   ├─ foxpage-component-editor-storybook-addon // storybook 插件, 服务于 editor
  |   ├─ foxpage-component-editor-widgets         // editor 组件
  |   ├─ foxpage-component-shared                 // 公共 js
```

### ⏳ 安装

- 推荐使用 **yarn** 安装 Foxpage. [使用这些文档安装 yarn](https://yarnpkg.com/lang/en/docs/install/)

```shell
$ yarn boot
$ lerna run build
```

### 启动

```shell
$ yarn start

```

## 成为贡献者

在向项目提交拉取请求之前，请阅读我们的 [贡献指南](https://www.foxpage.io/#/guide/contribute)。


## 文档中心

- [开发者文档](https://www.foxpage.io/#/developer)
- [用户指南](https://www.foxpage.io/#/course)

