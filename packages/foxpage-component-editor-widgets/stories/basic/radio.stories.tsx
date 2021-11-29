import React from 'react';
import Radio from '../../src/basic/radio/Radio';
import { EditorProvider } from '../_helper';

export default {
  component: Radio,
  title: 'basic/radio',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <p>radio:</p>
      <Radio.Group propKey="propKey">
        <Radio value="one">one</Radio>
        <Radio value="two">two</Radio>
      </Radio.Group>
    </EditorProvider>
  );
};

export const DisableVariables = () => {
  return (
    <EditorProvider>
      <p>radio:</p>
      <Radio.Group propKey="propKey" buttonStyle="solid" disableVariables>
        <Radio.Button value="one">one</Radio.Button>
        <Radio.Button value="two">two</Radio.Button>
      </Radio.Group>
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
      <p>radio:</p>
      <Radio.Group propKey="propKey" buttonStyle="solid" hideVariableBtn>
        <Radio.Button value="one">one</Radio.Button>
        <Radio.Button value="two">two</Radio.Button>
      </Radio.Group>
    </EditorProvider>
  );
};
