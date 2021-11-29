import { Props, EditorBaseProps } from '../../interface';
import { PropsWithChildren, ReactElement, CSSProperties } from 'react';

export interface ColorPickerType<P extends Props = Props> {
  <K extends keyof P>(props: PropsWithChildren<ColorPickerProps<P, K>>): ReactElement | null;
}

export type ColorPickerProps<P extends Props, K extends keyof P> = EditorBaseProps<P, K> & {
  style?: CSSProperties;
  disableVariables?: boolean;
  hideVariableBtn?: boolean;
};

declare let ColorPicker: ColorPickerType;
export default ColorPicker;
