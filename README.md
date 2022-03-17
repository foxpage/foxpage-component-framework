# Foxpage Component Framework

<p align="center">
  <!-- <a href="https://console.foxfamily.io/page/#"> -->
    <img src="https://www.foxpage.io/logo.jpg" width="260px" alt="Foxpage logo" />
  <!-- </a> -->
</p>
<h4 align="center">Low-code, made simple and fast</h4>
<!-- <p align="center"><a href="https://console.foxfamily.io/page/#/">Try live demo</a></p> -->
<br />

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D14.15.1-brightgreen" alt="Node Version" />
  <img src="https://img.shields.io/badge/typescript-%3E%3D4.3.0-brightgreen" alt="Typescript Version" />
  <img src="https://img.shields.io/badge/yarn-1.22.5-blue" alt="Yarn Version" />
  <img src="https://img.shields.io/badge/npm-%3E%3D6.14.x-blue" alt="NPM Version" />
</p>

Foxpage is a lightweight front-end low-code framework.

Foxpage Component Framework is a front-end Framework for componentization and integration of Component development, build, and release processes.

English | [简体中文](./README.zh-CN.md)

## Getting Started

<a href="https://www.foxpage.io/#/" target="_blank">Read the FoxPage tutorial</a>

## Project

```txt
<Project Root>
  ├── packages
  |   ├─ eslint-config-foxpage-component          // eslint config
  |   ├─ foxpage-component-babel-preset           // babel config
  |   ├─ foxpage-component-jest-preset            // jest config
  |   ├─ foxpage-component-storybook-addon        // storybook addon
  |   ├─ foxpage-component-storybook-preset       // storybook preset
  |   ├─ foxpage-component-webpack                // webpack config
  |   ├─ foxpage-component-context                // runtime context, data store
  |   ├─ foxpage-component-editor-context         // editor runtime context, data store
  |   ├─ foxpage-component-editor-storybook-addon // storybook addon for editor
  |   ├─ foxpage-component-editor-widgets         // editor widgets
  |   ├─ foxpage-component-shared                 // common js
```

### ⏳ Installation

- (Use **yarn** to install the Foxpage (recommended). [Install yarn with these docs](https://yarnpkg.com/lang/en/docs/install/).)

```shell
$ yarn boot
$ lerna run build
```

### Start

```shell
$ yarn start

```
## Contributing

Please read our [Contributing Guide](https://www.foxpage.io/#/guide/contribute) before submitting a Pull Request to the project.

## Documentation

See our documentation live [Docs](https://www.foxpage.io/) for the Foxpage Server.

- [Developer docs](https://www.foxpage.io/#/developer)
- [User guide](https://www.foxpage.io/#/course)
