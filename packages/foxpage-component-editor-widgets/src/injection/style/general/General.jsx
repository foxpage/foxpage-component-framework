import React, { Component } from 'react';
import { EditContext } from '@foxpage/foxpage-component-editor-context';

import Select from '../../../basic/select';
import Collapse from '../../../compose/Collapse';
import Label from '../../../compose/group/Label';
import FlexCol from '../../../compose/FlexCol';
import FlexField from '../../../compose/group/FlexField';

class General extends Component {
  static contextType = EditContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { propsRootKey = 'style', fold } = this.props;
    return (
      <Collapse defaultActiveKey={fold ? [] : ['1']}>
        <Collapse.Panel header="General" key="1">
          <FlexCol>
            <FlexField>
              <Label>Display</Label>
              <Select propKey={`${propsRootKey}.display`}>
                <Select.Option value="block">block</Select.Option>
                <Select.Option value="inline">inline</Select.Option>
                <Select.Option value="inline-block">inline-block</Select.Option>
                <Select.Option value="flex">flex</Select.Option>
                <Select.Option value="none">none</Select.Option>
              </Select>
            </FlexField>
            <FlexField>
              <Label>Float</Label>
              <Select propKey={`${propsRootKey}.float`}>
                <Select.Option value="none">none</Select.Option>
                <Select.Option value="left">left</Select.Option>
                <Select.Option value="right">right</Select.Option>
              </Select>
            </FlexField>
          </FlexCol>
        </Collapse.Panel>
      </Collapse>
    );
  }
}

export default General;
