import React from 'react';
import Flex from '../../src/injection/style/flex';
import { EditorProvider } from '../_helper';

export default {
  component: Flex,
  title: 'injection/style-flex',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <Flex />
    </EditorProvider>
  );
};

export const FoxpageWidth = () => {
  return (
    <EditorProvider>
      <div
        style={{
          width: 298,
        }}
      >
        <Flex />
      </div>
    </EditorProvider>
  );
};

export const PropsRootKey = () => {
  return (
    <EditorProvider>
      <div
        style={{
          width: 298,
        }}
      >
        <Flex propsRootKey="propsRootKey" />
      </div>
    </EditorProvider>
  );
};

export const Fold = () => {
  return (
    <EditorProvider>
      <div
        style={{
          width: 298,
        }}
      >
        <Flex propsRootKey="propsRootKey" fold />
      </div>
    </EditorProvider>
  );
};
