import { Props, EditorBaseProps } from '../../interface';
import { CheckboxProps as AntdCheckboxProps } from 'antd/lib/checkbox';
import { PropsWithChildren, ReactElement } from 'react';

export interface CheckboxType<P extends Props = Props> {
  <K extends keyof P>(props: PropsWithChildren<CheckboxProps<P, K>>): ReactElement | null;
}

export type CheckboxProps<P extends Props, K extends keyof P> = EditorBaseProps<P, K> &
  AntdCheckboxProps & {
    label?: string;
    disableVariables?: boolean;
    hideVariableBtn?: boolean;
  };

declare let Checkbox: CheckboxType;
export default Checkbox;
