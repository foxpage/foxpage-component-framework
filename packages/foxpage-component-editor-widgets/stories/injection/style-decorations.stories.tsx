import React from 'react';
import Decorations from '../../src/injection/style/decorations';
import { EditorProvider } from '../_helper';

export default {
  component: Decorations,
  title: 'injection/style-decorations',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <Decorations />
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
        <Decorations />
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
        <Decorations propsRootKey="propsRootKey" />
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
        <Decorations propsRootKey="propsRootKey" fold />
      </div>
    </EditorProvider>
  );
};
