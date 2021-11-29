## Config
register in .storybook/addon.ts

```
import '@foxpage/foxpage-component-editor-storybook-addon/lib/register';
```

## Useage

in your *.stories.js file:

```
// import addon
import { withFoxpageEditor, mountEditor } from '@foxpage/foxpage-component-editor-storybook-addon';

// import component and editor
import Component from '../src/index';
import Editor from '../editor/index';

// init stories
const stories = storiesOf('Use foxpage-editor-addon', module);
stories.addDecorator(withFoxpageEditor);

stories.add('editable story', () => {
  // mount edit with props
  const props = mountEditor(Editor, {
    promoId: 593,
    blockId: 1,
  });

  // use props
  return <Component {...props} />
});

```
