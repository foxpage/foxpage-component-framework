import React from 'react';
import { EditorWidgets } from '@foxpage/foxpage-component-editor-widgets';
import { JSONSchema7 } from 'json-schema';

type Props = Record<string, any>;

interface BindVariableOption {
  type?: 'string' | 'object' | 'html-string' | string;
  desc?: string;
}

export interface EditContextType<P extends Props = Record<string, unknown>> {
  componentProps: Partial<P>;
  propChange: <K extends keyof P>(prop: K, val: P[K]) => void;
  propsChange: (props: Partial<P>) => void;
  applyState(...a: any[]): void;
  onBindVariable(k: string, option?: BindVariableOption): any;
  widgets?: EditorWidgets<P> | null;
  schema?: JSONSchema7;
}

export let EditContext: React.Context<EditContextType>;

export let useEditObject: <T extends Props = Props>(opt: {
  data: T;
}) => {
  Provider: React.FC<Record<string, unknown>>;
  value: T;
  setProperty: <K extends keyof T = string>(k: K, v: T[K]) => void;
  setValue: (partial: Partial<T>) => void;
};

export let useEditContext: () => React.Context<EditContextType>;
