import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { EditorWidgets } from '@foxpage/foxpage-component-editor-widgets';
import { EditContextType, EditContext, PANEL_KEY } from '@foxpage/foxpage-component-editor-context';

export { EditContextType, EditorWidgets };
export { EditContext };
export const FoxpageEditorPanelKey: typeof PANEL_KEY;

export const useEditContext: () => EditContextType;

type Props = Record<string, any>;

export type EditorProps<P extends Props = Record<string, unknown>> = EditContextType<P> & { widgets: EditorWidgets<P> };

export type EditorFC<P extends Props = Record<string, unknown>> = React.FC<EditorProps<P>>;
export type EditorComponentType<P extends Props = Record<string, unknown>> = React.ComponentType<EditorProps<P>>;

export function mountEditor<T extends Record<string, any>>(
  editor: EditorComponentType<T>,
  props: Partial<T>,
  exInfo?: { schema?: any; [key: string]: any },
): T;

export let withFoxpageEditor: ReturnType<typeof makeDecorator>;
