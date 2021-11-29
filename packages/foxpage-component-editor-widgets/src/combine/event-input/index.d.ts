import { ReactElement, PropsWithChildren } from 'react';
import { InputProps as AntdInputProps } from 'antd/lib/input';
import { EditorBaseProps, Props } from '../../interface';

export type EventInputType<P extends Props = Props> = <K extends keyof P>(
  props: PropsWithChildren<EventInputProps<P, K>>,
) => ReactElement | null;

export interface EventInputProps<P extends Props = Props, K extends keyof P = string>
  extends AntdInputProps,
    EditorBaseProps<P, K> {
  defaultValue?: string;
  blankIndicatesUndefined?: boolean;
  prefixStr?: string;
  validate?(value: string): boolean;
  convert?(value: string): string | P[K];
}

let EventInput: React.FC<EventInputProps>;

export default EventInput;
