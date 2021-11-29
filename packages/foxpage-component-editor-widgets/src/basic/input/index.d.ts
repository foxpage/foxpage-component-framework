import { ReactElement, PropsWithChildren } from 'react';
import { InputProps as AntdInputProps } from 'antd/lib/input';
import { EditorBaseProps, Props } from '../../interface';

export type InputType<P extends Props = Props> = <K extends keyof P>(
  props: PropsWithChildren<InputProps<P, K>>,
) => ReactElement | null;

export interface InputProps<P extends Props = Props, K extends keyof P = string>
  extends AntdInputProps,
    EditorBaseProps<P, K> {
  defaultValue?: string;
  blankIndicatesUndefined?: boolean;
  numberPreferred?: boolean;
  disableVariables?: boolean;
  hideVariableBtn?: boolean;
  inline?: boolean;
  validate?(value: string): boolean;
  convert?(value: string): string | P[K];
}

let Input: React.FC<InputProps>;

export default Input;
