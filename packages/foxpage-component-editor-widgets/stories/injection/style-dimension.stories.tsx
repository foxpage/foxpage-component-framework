import React from 'react';
import Dimension from '../../src/injection/style/dimension';
import { EditorProvider } from '../_helper';

export default {
  component: Dimension,
  title: 'injection/style-dimension',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <Dimension />
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
        <Dimension />
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
        <Dimension propsRootKey="propsRootKey" />
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
        <Dimension propsRootKey="propsRootKey" fold />
      </div>
    </EditorProvider>
  );
};
