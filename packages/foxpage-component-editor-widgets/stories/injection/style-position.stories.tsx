import React from 'react';
import Position from '../../src/injection/style/position';
import { EditorProvider } from '../_helper';

export default {
  component: Position,
  title: 'injection/style-position',
};

export const BaseUsage = () => {
  return (
    <EditorProvider>
      <Position />
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
        <Position />
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
        <Position propsRootKey="propsRootKey" />
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
        <Position propsRootKey="propsRootKey" fold />
      </div>
    </EditorProvider>
  );
};
