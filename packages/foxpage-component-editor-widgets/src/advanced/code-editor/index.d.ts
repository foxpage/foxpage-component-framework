import { Props, EditorBaseProps } from '../../interface';
import { PropsWithChildren, ReactElement } from 'react';
import { AceEditorProps } from 'react-ace';

export interface CodeEditorType<P extends Props = Props> {
  <K extends keyof P>(props: PropsWithChildren<CodeEditorProps<P, K>>): ReactElement | null;
}

export type CodeEditorProps<P extends Props, K extends keyof P> = EditorBaseProps<P, K> &
  Omit<AceEditorProps, 'name' | 'value'> & {
    hideVariableBtn?: boolean;
  };

declare let CodeEditor: CodeEditorType<P>;
export default CodeEditor;
