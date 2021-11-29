import React from 'react';
import General from '../../src/injection/style/general';
import { EditorProvider } from '../_helper';

export default {
  component: General,
  title: 'injection/style-general',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <General />
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
        <General />
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
        <General propsRootKey="propsRootKey" />
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
        <General propsRootKey="propsRootKey" fold />
      </div>
    </EditorProvider>
  );
};
