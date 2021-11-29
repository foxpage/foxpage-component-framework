import { Props, EditorBaseProps } from '../../interface';
import { PropsWithChildren, ReactElement } from 'react';
import { EditorConfiguration } from 'codemirror';

export interface CodeAreaType<P extends Props = Props> {
  <K extends keyof P>(props: PropsWithChildren<CodeAreaProps<P, K>>): ReactElement | null;
}

export type CodeAreaProps<P extends Props, K extends keyof P> = EditorBaseProps<P, K> & {
  mode?: EditorConfiguration['mode'];
  height?: number | string;
  hideVariableBtn?: boolean;
};

declare let CodeArea: CodeAreaType;
export default CodeArea;
