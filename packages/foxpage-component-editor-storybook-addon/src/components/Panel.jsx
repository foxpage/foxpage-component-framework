import React from 'react';
import addons from '@storybook/addons';
import { EditContext } from '@foxpage/foxpage-component-editor-context';
import * as widgets from '@foxpage/foxpage-component-editor-widgets';
import * as ObPathImmutable from 'object-path-immutable';
import { APPLY_PROPS_CHANGE, MOUNT_EDITOR, UNMOUNT_EDITOR } from '../shared';

window.EditContext = EditContext;

class Panel extends React.Component {
  state = {
    props: {},
    mounted: false,
    schema: null,
  };

  componentDidMount() {
    const { api } = this.props;
    api.on(MOUNT_EDITOR, this.setEditor);
    api.on(UNMOUNT_EDITOR, this.unmountEditor);
  }

  componentWillUnmount() {
    const { api } = this.props;
    api.off(MOUNT_EDITOR, this.setEditor);
    api.off(UNMOUNT_EDITOR, this.unmountEditor);
  }

  unmountEditor = () => {
    this.setState({ mounted: false });
  };

  setEditor = (props, { schema = null } = {}) => {
    this.setState({
      props,
      mounted: true,
      schema,
    });
  };

  handlePropChange = (keys, value) => {
    // console.log('propChange: ', keys, value);
    const { props: componentProps } = this.state;
    this.setState({ props: ObPathImmutable.set(componentProps || {}, keys, value) });
  };

  handlePropsChange = props => {
    this.setState({ props });
  };

  handleApplyPropsChange = () => {
    const { props } = this.state;
    // console.log('apply props: ', props);
    addons.getChannel().emit(APPLY_PROPS_CHANGE, props);
  };

  handleApplyState = () => {
    // const { props: componentProps } = this.state;
    // console.debug('[editor] applyState: ', componentProps);
  };

  handleBindVariable = (
    key,
    option = {
      // string
      // object
      // html-string
      type: 'string',
      desc: '',
    },
  ) => {
    console.debug('[editor] onBindVariable: ', key, option);
  };

  render() {
    const { props, mounted, schema } = this.state;
    const Editor = window.foxpageEditor;
    if (!mounted) {
      return <div style={{ padding: 16 }}>no foxpage editor found</div>;
    }

    const editorParams = {
      componentProps: props,
      propsChange: this.handlePropsChange,
      propChange: this.handlePropChange,
      applyState: this.handleApplyState,
      onBindVariable: this.handleBindVariable,
      widgets,
      schema,
    };

    const { active } = this.props;
    if (!(Editor && active)) return null;
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: 'auto',
        }}
      >
        <button
          style={{
            position: 'fixed',
            right: 0,
            color: '#fff',
            background: '#007bff',
            padding: '1px 8px',
            fontSize: 12,
            cursor: 'pointer',
            borderColor: 'rgb(24,144,255, 0.5)',
            zIndex: 5000,
          }}
          onClick={this.handleApplyPropsChange}
        >
          Apply
        </button>
        <EditContext.Provider value={editorParams}>
          <Editor {...editorParams} />
        </EditContext.Provider>
      </div>
    );
  }
}

export default Panel;
