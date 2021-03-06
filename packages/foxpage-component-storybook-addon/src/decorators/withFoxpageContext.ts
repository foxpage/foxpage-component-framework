import { createElement, ReactNode } from 'react';
import { makeDecorator } from '@storybook/addons';
import { ExternalContextType } from '@foxpage/foxpage-component-context';
import Wrapper from '../components/FoxpageContextWrapper';
import { ADDON_PARAM_KEY, ADDON_DECORATOR_NAME } from '../constant';
import { StoryWrapperSettings } from '../typings';
import { FoxpageSsrContextType } from '../context/SsrProvider';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FoxpageContextGlobalOptionTypes {}
export interface FoxpageContextParametersTypes {
  disable?: boolean;
  context?: ExternalContextType;
  ssrContext?: FoxpageSsrContextType;
}

export const makeFoxpageContextDecorator = (_globalOptions: Partial<FoxpageContextGlobalOptionTypes> = {}) => {
  return makeDecorator({
    name: ADDON_DECORATOR_NAME,
    parameterName: ADDON_PARAM_KEY,
    skipIfNoParametersOrOptions: false,
    wrapper: (getStory, context, { parameters = {} }: StoryWrapperSettings<FoxpageContextParametersTypes>) => {
      // _globalOptions 是保留字段，方便后面扩展
      if (parameters.disable) {
        return getStory(context);
      }
      return createElement(
        Wrapper,
        { context: parameters.context || {}, ssrContext: parameters.ssrContext || {} },
        getStory(context) as ReactNode,
      );
    },
  });
};
