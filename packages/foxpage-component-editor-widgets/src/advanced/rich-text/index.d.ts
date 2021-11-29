import { Props, EditorBaseProps } from '../../interface';
import { PropsWithChildren, ReactElement } from 'react';

export interface RichTextType<P extends Props = Props> {
  <K extends keyof P>(props: PropsWithChildren<RichTextProps<P, K>>): ReactElement | null;
}

export type RichTextProps<P extends Props, K extends keyof P> = EditorBaseProps<P, K>;

declare let RichText: RichTextType;
export default RichText;
