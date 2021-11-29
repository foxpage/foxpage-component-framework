import React from 'react';
import Switch from '../../src/basic/switch/Switch';
import { EditorProvider } from '../_helper';

export default {
  component: Switch,
  title: 'basic/switch',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <p>switch:</p>
      <Switch propKey="propKey" label="test-switch" />
    </EditorProvider>
  );
};

export const DisableVariables = () => {
  return (
    <EditorProvider>
      <p>switch:</p>
      <Switch propKey="propKey" disableVariables />
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
      <p>switch:</p>
      <Switch propKey="propKey" hideVariableBtn />
    </EditorProvider>
  );
};
