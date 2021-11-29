import React from 'react';
import Checkbox from '../../src/basic/checkbox/Checkbox';
import { EditorProvider } from '../_helper';

export default {
  component: Checkbox,
  title: 'basic/checkbox',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <Checkbox propKey="propKey" label="checkbox" />
    </EditorProvider>
  );
};

export const DisableVariables = () => {
  return (
    <EditorProvider>
      <Checkbox propKey="propKey" label="checkbox" disableVariables />
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
      <Checkbox propKey="propKey" label="checkbox" hideVariableBtn />
    </EditorProvider>
  );
};
