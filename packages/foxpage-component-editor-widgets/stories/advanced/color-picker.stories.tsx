import React from 'react';
import { EditorProvider } from '../_helper';
import ColorPicker from '../../src/advanced/color-picker';

export default {
  component: ColorPicker,
  title: 'advanced/color-picker',
};

export const BaseUsage = () => {
  return (
    <EditorProvider
      props={{
        propKey: `#287dfa`,
      }}
    >
      <p>color-picker:</p>
      <ColorPicker propKey="propKey" />
    </EditorProvider>
  );
};

export const DisableVariables = () => {
  return (
    <EditorProvider
      props={{
        propKey: `#287dfa`,
      }}
    >
      <p>color-picker:</p>
      <ColorPicker propKey="propKey" disableVariables />
    </EditorProvider>
  );
};

export const HideVariablesBtn = () => {
  return (
    <EditorProvider
      props={{
        propKey: '{{testVariable}}',
      }}
    >
      <p>color-picker:</p>
      <ColorPicker propKey="propKey" hideVariableBtn />
    </EditorProvider>
  );
};

export const FoxpageWidth = () => {
  return (
    <EditorProvider
      props={{
        propKey: `#287dfa`,
      }}
    >
      <div
        style={{
          width: 298,
        }}
      >
        <p>color-picker:</p>
        <ColorPicker propKey="propKey" />
      </div>
    </EditorProvider>
  );
};

export const MockStyle = () => {
  return (
    <EditorProvider
      props={{
        propKey: `#287dfa`,
      }}
    >
      <div
        style={{
          width: 298,
        }}
      >
        <p>color-picker:</p>
        <ColorPicker propKey="propKey" style={{ width: '100px' }} />
      </div>
    </EditorProvider>
  );
};
