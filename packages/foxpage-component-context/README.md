# @foxpage/foxpage-component-context

为 foxpage 页面提供页面维度的静态数据及API的数据存储功能

## 使用

用户可以直接在组件内部通过 `useFoxpageContext` 获取数据, 方式如下:

``` tsx
import React from 'react';
import { useFoxpageContext } from '@foxpage/foxpage-component-context';
import { ComponentProps } from './typing';

const HelloWorld: React.FC<ComponentProps> = props => {
  const foxpageContext = useFoxpageContext();
  console.debug('HelloWorld foxpageContext: ', foxpageContext);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default HelloWorld;
```

## 扩展 FoxpageContext 数据

在生产环境需要按foxpage平台规范实现满足声明周期钩子函数的插件来扩展数据, 详情请查看官方文档.

测试环境只需要实现一个简单的 `storybook decorators` 插件即可, 示例如下:

``` js
// .storybook/decorators/foxpage-customer-context.js
import React from 'react';
import { FoxpageCtxOverridesProvider } from '@foxpage/foxpage-component-context';

export const FoxpageCustomerContextDecorator = (StoryFn) => {
  return (
    <FoxpageCtxOverridesProvider value={{
      // 扩展 locale 字段, 组件可直接使用 locale 字段
      locale: 'zh-HK',
    }}>
      <StoryFn />
    </FoxpageCtxOverridesProvider>
  )
};
```

在 `.storybook/preview.js` 中接入上述实现的 `decorator` 插件
``` js
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
      // 这里可设置默认值，优先级最低
      locale: 'en-US',
    }
  }
};

```
