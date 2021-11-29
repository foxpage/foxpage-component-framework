import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import * as ObPathImmutable from 'object-path-immutable';
import { EditContext } from '@foxpage/foxpage-component-editor-context';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import VariableBtn from '../../../components/VariableComp/VariableBtn';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css';
import { isVariables } from '../../../utils/variables';

const Option = {
  type: 'html-string',
};
class Draft extends Component {
  static contextType = EditContext;

  constructor(props, context) {
    super(props);
    const { componentProps } = context;
    const { propKey } = this.props;

    const html = ObPathImmutable.get(componentProps, propKey, '');
    const state = {
      html,
    };

    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      state.editorState = editorState;
    }
    this.state = state;
    this.handlePropChange = debounce(this.handlePropChange.bind(this), 200);
  }

  componentDidUpdate(prevProps, prevState) {
    const { componentProps } = this.context;
    const { propKey } = this.props;
    const { html } = this.state;
    if (typeof propKey === 'undefined') {
      return;
    }
    // 内部 state 改变不做双向数据同步处理 默认他数据处理是正确的
    if (this.state !== prevState) {
      return;
    }
    // else: 不是内部的 state 改变
    const propsHtml = ObPathImmutable.get(componentProps, propKey, '');
    try {
      if (propsHtml !== html) {
        const contentBlock = htmlToDraft(propsHtml);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          this.setState({
            html: propsHtml,
            editorState: EditorState.createWithContent(contentState),
          });
        }
      }
    } catch (e) {
      console.warn(e.message);
    }
  }

  handlePropChange(editorState) {
    const { propChange, applyState } = this.context;
    const { propKey, onChange } = this.props;
    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({
      html: value,
    });
    propChange(propKey, value);
    if (onChange) {
      onChange(value);
    }
    if (applyState) {
      applyState();
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
    this.handlePropChange(editorState);
  };

  render() {
    const { editorState, html } = this.state;
    const { toolbar = {}, propKey } = this.props;
    const { inline = {}, list = {}, textAlign = {}, link = {}, history = {} } = toolbar;
    const active = isVariables(html, { isMulti: true });
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="draft-wysiwyg-wrapper"
          editorClassName="draft-wysiwyg-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            ...toolbar,
            inline: { inDropdown: true, ...inline },
            list: { inDropdown: true, ...list },
            textAlign: { inDropdown: true, ...textAlign },
            link: { inDropdown: true, ...link },
            history: { inDropdown: true, ...history },
          }}
          toolbarCustomButtons={[
            <VariableBtn key="custom-btn-variable" propKey={propKey} option={Option} active={active} style={{ margin: '0px 3px 6px' }} />,
          ]}
        />
      </div>
    );
  }
}

export default Draft;
