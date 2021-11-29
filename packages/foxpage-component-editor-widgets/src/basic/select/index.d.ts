import { Props, EditorBaseProps, EditorStyleProps } from '../../interface';
import { SelectProps as AntdSelectProps, OptionProps as AntdOptionProps } from 'antd/lib/select';

import { PropsWithChildren, ReactElement } from 'react';

export interface SelectType<P extends Props = Props> {
  <K extends keyof P>(props: PropsWithChildren<SelectProps<P, K>>): ReactElement | null;
  Option: React.ClassicComponentClass<AntdOptionProps>;
}

export type SelectProps<P extends Props, K extends keyof P> = EditorBaseProps<P, K> &
  EditorStyleProps &
  AntdSelectProps & {
    width?: React.CSSProperties['width'];
    disableVariables?: boolean;
    hideVariableBtn?: boolean;
  };

declare let Select: SelectType;
export default Select;
