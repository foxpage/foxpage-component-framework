import React from 'react';
import Attributes from '../../src/injection/attributes';
import { EditorProvider } from '../_helper';

export default {
  component: Attributes,
  title: 'injection/attributes',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <Attributes />
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
        <Attributes />
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
        <Attributes propsRootKey="propsRootKey" />
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
        <Attributes propsRootKey="propsRootKey" fold />
      </div>
    </EditorProvider>
  );
};
