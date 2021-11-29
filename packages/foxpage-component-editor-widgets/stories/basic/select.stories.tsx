import React from 'react';
import Select from '../../src/basic/select/Select';
import { EditorProvider } from '../_helper';

export default {
  component: Select,
  title: 'basic/select',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <p>select:</p>
      <Select propKey="propKey" width="200px">
        <Select.Option value="one">one</Select.Option>
        <Select.Option value="two">two</Select.Option>
      </Select>
    </EditorProvider>
  );
};

export const DisableVariables = () => {
  return (
    <EditorProvider>
      <p>select:</p>
      <Select propKey="propKey" width="200px" disableVariables>
        <Select.Option value="one">one</Select.Option>
        <Select.Option value="two">two</Select.Option>
      </Select>
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
      <p>select:</p>
      <Select propKey="propKey" width="200px" hideVariableBtn>
        <Select.Option value="one">one</Select.Option>
        <Select.Option value="two">two</Select.Option>
      </Select>
    </EditorProvider>
  );
};
