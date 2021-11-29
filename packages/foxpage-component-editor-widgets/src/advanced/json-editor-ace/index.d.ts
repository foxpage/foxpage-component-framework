import { Props, EditorBaseProps } from '../../interface';
import { PropsWithChildren, ReactElement } from 'react';
import { IAceEditorProps } from 'react-ace';

export interface JSONEditorAceType<P extends Props = Props> {
  <K extends keyof P>(props: PropsWithChildren<JSONEditorAceProps<P, K>>): ReactElement | null;
}

export type JSONEditorAceProps<P extends Props, K extends keyof P> = EditorBaseProps<P, K> &
  Pick<IAceEditorProps, 'style' | 'theme'> & {
    hideVariableBtn?: boolean;
  };

declare let JSONEditorAce: JSONEditorAceType;
export default JSONEditorAce;
