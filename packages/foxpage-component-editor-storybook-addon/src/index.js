/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import { FORCE_RE_RENDER, STORY_CHANGED } from '@storybook/core-events';
import storeApi from './store';
import { MOUNT_EDITOR, UNMOUNT_EDITOR, APPLY_PROPS_CHANGE, PANEL_KEY } from './shared';
import { EditContext } from '@foxpage/foxpage-component-editor-context';

export { EditContext };
export const FoxpageEditorPanelKey = PANEL_KEY;

export function useEditContext() {
  return React.useContext(EditContext);
}

const store = storeApi.getStore();
const channel = addons.getChannel();
channel.on(APPLY_PROPS_CHANGE, applyPropsChange);
channel.on(STORY_CHANGED, storyChange);

function applyPropsChange(props) {
  store.set(props);
  channel.emit(FORCE_RE_RENDER);
}

function storyChange() {
  channel.emit(UNMOUNT_EDITOR);
  store.reset();
  window.parent.foxpageEditor = undefined;
}

export const withFoxpageEditor = makeDecorator({
  name: 'withFoxpageEditor',
  parameterName: 'withFoxpageEditor',
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: true,
  wrapper: (getStory, context) => {
    return getStory(context);
  },
});

export function mountEditor(editor, props, extInfo = {}) {
  if (store.get()) {
    return store.get();
  }
  window.parent.foxpageEditor = editor;
  channel.emit(MOUNT_EDITOR, props, extInfo);
  return props;
}
