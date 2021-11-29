import { Props, EditorBaseProps } from '../../interface';
import { PropsWithChildren, ReactElement } from 'react';

export interface JSONEditorType<P extends Props = Props> {
  <K extends keyof P>(props: PropsWithChildren<JSONEditorProps<P, K>>): ReactElement | null;
}

export type JSONEditorProps<P extends Props, K extends keyof P> = EditorBaseProps<P, K> & {
  style?: React.CSSProperties;
  hideVariableBtn?: boolean;
  onChange?(value: string): void;
};

declare let JSONEditor: JSONEditorType;
export default JSONEditor;
