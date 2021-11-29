import React from 'react';
import { EditorProvider } from '../_helper';
import RichTextDraft from '../../src/advanced/rich-text/draft/Draft';

export default {
  component: RichTextDraft,
  title: 'advanced/rich-text',
};

export const Draft = () => {
  return (
    <EditorProvider props={{}}>
      <RichTextDraft propKey="richTextDraft" />
    </EditorProvider>
  );
};
