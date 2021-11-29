# @foxpage/foxpage-component-storybook-addon

为 `foxpage-component-boilerplate` 开发组件提供 `storybook` 插件.

内部封装了想要正常运行 `foxpage 组件` 所需要的基础环境, 如: `FoxpageCtxBaseProvider`, `FoxpageSsrCtxBaseProvider`, 组件可直接以消费者模式使用 `Provider` 提供的数据
## FoxpageSsrContext

在开发环境模拟真实环境(foxpage 平台)的 `RootContext`, 默认内置了 mock 版本的 `RootContext` 对象,

主要为 `beforeNodeBuild` 钩子方法提供 `props` 参数

用户可以通过 `decorator 插件` 的方式扩展该对象, 方式如下:

``` js
// .storybook/decorators/foxpage-ssr.js
import React from 'react';
import axios from 'axios';
import { FoxpageSsrCtxOverridesProvider } from '@foxpage/foxpage-component-storybook-addon';

export const FoxpageSsrDecorator = (StoryFn) => {
  return (
    <FoxpageSsrCtxOverridesProvider value={{
      axios,
    }}>
      <StoryFn />
    </FoxpageSsrCtxOverridesProvider>
  )
};

// .storybook/preview.js
import { makeFoxpageContextDecorator } from '@foxpage/foxpage-component-storybook-addon';
import { FoxpageSsrDecorator } from './decorators/foxpage-ssr';

export const decorators = [
  // 注意: 放在 `makeFoxpageContextDecorator()` 前, 靠后的先执行，需要 `makeFoxpageContextDecorator` 预设好基础环境, 才可扩展
  FoxpageSsrDecorator,
  makeFoxpageContextDecorator(),
];
```

> 注意: 需要使用方在分别开发 `开发环境插件` `生产环境插件` 时保证扩展的字段是一致的（开发环境可为mock 版本，能保证正常使用即可）。
> 提示: `开发环境插件` 不仅可以简单的使用 mock 版数据, 还可以开发 `storybook` 的 `Toolbar` `Panel` 插件配合提供 mock 数据。

## FoxpageContext

组件通过 `useFoxpageContext` 获取数据(一般用于存放页面级别的静态数据或api, 由node端计算, 组件使用), 同时支持 `browser` `node` 环境

用户可以通过 `decorator 插件` 的方式扩展该对象, 方式如下:


``` js
// .storybook/decorators/foxpage-customer-context.js
import React from 'react';
import { FoxpageCtxOverridesProvider } from '@foxpage/foxpage-component-context';

export const FoxpageCustomerContextDecorator = (StoryFn) => {
  return (
    <FoxpageCtxOverridesProvider value={{
      // 覆盖数据
      locale: 'zh-HK(cover en-US)',
      // 扩展数据
      customerLocale: 'test locale',
    }}>
      <StoryFn />
    </FoxpageCtxOverridesProvider>
  )
};


// .storybook/preview.js
import { makeFoxpageContextDecorator } from '@foxpage/foxpage-component-storybook-addon';
import { FoxpageCustomerContextDecorator } from './decorators/foxpage-customer-context';

export const decorators = [
  // 注意: 放在 `makeFoxpageContextDecorator()` 前, 靠后的先执行，需要 `makeFoxpageContextDecorator` 预设好基础环境, 才可扩展
  FoxpageCustomerContextDecorator,
  makeFoxpageContextDecorator(),
];

export const parameters = {
  foxpageContext: {
    context: {
      locale: 'en-US',
    }
  }
};

```

## withFoxpageSsr

为了让组件在开发环境也能运行 `beforeNodeBuild` 钩子方法处理组件的 props 数据, 需要用户在 `stories` 中引入 `withFoxpageSsr`

接入方式如下:

``` tsx
// index.stories.tsx
import React from 'react';
import { withFoxpageSsr } from '@foxpage/foxpage-component-storybook-addon';
import HelloWorld from '../src/index';

export default {
  title: 'HelloWorldSsr',
  component: HelloWorld,
};

const HelloWorldSsrWrap = withFoxpageSsr({
  // 强制设置或扩展 ssrContext
  // 正常流程一般会用, 应该交给插件去做而不是组件开发组, 但组件开发者在开发环境有能力覆盖其值
  ssrContext: {},
  // 强制设置或扩展 context
  // 如果逐渐开发者不想 context 数据受外部插件控制, 可以自行 mock
  context: {
    locale: 'zh_hk',
  },
})(HelloWorld);

export const HelloWorldSsrComponent = () => {
  const props = {
    number: 2,
  };
  return <HelloWorldSsrWrap {...props} />;
};

// component.tsx
// 参数类型请以最新的文档为准
HelloWorld.beforeNodeBuild = async (ctx) => {
  return {
    ...data,
  };
};

```
