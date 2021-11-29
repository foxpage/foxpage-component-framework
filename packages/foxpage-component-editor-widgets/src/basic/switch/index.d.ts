import { Props, EditorBaseProps } from '../../interface';
import { SwitchProps as AntdSwitchProps } from 'antd/lib/switch';
import { PropsWithChildren, ReactElement } from 'react';

export interface SwitchType<P extends Props = Props> {
  <K extends keyof P>(props: PropsWithChildren<SwitchProps<P, K>>): ReactElement | null;
}

export type SwitchProps<P extends Props, K extends keyof P> = EditorBaseProps<P, K> &
  AntdSwitchProps & {
    label: string;
    disableVariables?: boolean;
    hideVariableBtn?: boolean;
  };

declare let Switch: SwitchType;
export default Switch;
