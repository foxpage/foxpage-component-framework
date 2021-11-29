import React from 'react';
import { StyledComponent } from 'styled-components';

export type Props = Record<string, any>;

export type BaseDivStyledComponent = StyledComponent<'div', any, Record<string, unknown>, never>;

export interface EditorBaseProps<P extends Props, K extends keyof P> {
  propKey: K | string;
}

export interface EditorStyleProps {
  width?: React.CSSProperties['width'];
}
