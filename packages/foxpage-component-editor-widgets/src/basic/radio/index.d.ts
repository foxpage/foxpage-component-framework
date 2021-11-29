import {
  RadioProps as AntdRadioProps,
  RadioGroupProps as AntdRadioGroupProps,
  Button as AntdButton,
} from 'antd/lib/radio';
import { PropsWithChildren, ReactElement } from 'react';
import { Props, EditorBaseProps } from '../../interface';

export interface RadioType<P extends Props = Props> {
  (props: PropsWithChildren<RadioProps>): ReactElement | null;
  Group<K extends keyof P>(props: PropsWithChildren<GroupProps<P, K>>): ReactElement | null;
  Button: AntdButton;
}

export type RadioProps = AntdRadioProps;

export interface GroupProps<P extends Props, K extends keyof P> extends EditorBaseProps<P, K>, AntdRadioGroupProps {
  width?: React.CSSProperties['width'];
  disableVariables?: boolean;
  hideVariableBtn?: boolean;
  style?: React.CSSProperties;
}

declare let Radio: RadioType;
export default Radio;
