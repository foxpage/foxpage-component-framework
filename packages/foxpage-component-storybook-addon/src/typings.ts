import { WrapperSettings } from '@storybook/addons';

export interface StoryWrapperSettings<P> extends WrapperSettings {
  parameters: P;
}
