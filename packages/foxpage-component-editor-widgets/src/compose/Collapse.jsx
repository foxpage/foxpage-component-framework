import React from 'react';
import { Collapse as AntdCollapse } from 'antd';

const { Panel: AntdPanel } = AntdCollapse;
const customPanelStyle = {
  background: '#fafafa',
  borderRadius: 0,
  marginBottom: 2,
  border: 0,
  overflow: 'hidden',
  borderBottom: '1px solid #e5e5e5',
  borderTop: '#1px solid f2f2f2',
};

class Panel extends React.Component {
  render() {
    return (
      <AntdPanel {...this.props} style={{ ...customPanelStyle, ...this.props.style }}>
        {this.props.children}
      </AntdPanel>
    );
  }
}

class Collapse extends React.Component {
  render() {
    return (
      <AntdCollapse {...this.props} bordered={false}>
        {this.props.children}
      </AntdCollapse>
    );
  }
}

Collapse.Panel = Panel;

export default Collapse;
