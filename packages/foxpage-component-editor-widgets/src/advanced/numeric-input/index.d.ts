import { Props, EditorBaseProps } from '../../interface';
import { PropsWithChildren, ReactElement } from 'react';
import { InputProps as AntdInputProps } from 'antd/lib/input';

export interface NumericInputType<P extends Props = Props> {
  <K extends keyof P>(props: PropsWithChildren<NumericInputProps<P, K>>): ReactElement | null;
}

export type NumericInputProps<P extends Props, K extends keyof P> = EditorBaseProps<P, K> & {
  style?: AntdInputProps['style'];
  placeholder?: AntdInputProps['placeholder'];
  addonAfter?: AntdInputProps['addonAfter'];
  disableVariables?: boolean;
  hideVariableBtn?: boolean;
  inline?: boolean;
  onBlur?(): void;
};

declare let NumericInput: NumericInputType;
export default NumericInput;
