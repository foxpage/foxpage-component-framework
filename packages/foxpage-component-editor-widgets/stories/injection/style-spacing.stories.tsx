import React from 'react';
import Spacing from '../../src/injection/style/spacing';
import { EditorProvider } from '../_helper';

export default {
  component: Spacing,
  title: 'injection/style-spacing',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <Spacing />
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
        <Spacing />
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
        <Spacing propsRootKey="propsRootKey" />
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
        <Spacing propsRootKey="propsRootKey" fold />
      </div>
    </EditorProvider>
  );
};
