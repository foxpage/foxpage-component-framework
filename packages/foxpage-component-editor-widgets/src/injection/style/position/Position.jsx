import React, { Component } from 'react';
import { EditContext } from '@foxpage/foxpage-component-editor-context';
import * as ObPathImmutable from 'object-path-immutable';

import Input from '../../../basic/input';
import Select from '../../../basic/select';
import Collapse from '../../../compose/Collapse';
import FlexCol from '../../../compose/FlexCol';
import FlexField from '../../../compose/group/FlexField';

class Position extends Component {
  static contextType = EditContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSelectChange = value => {
    const { propsRootKey = 'style' } = this.props;
    const { propChange } = this.context;
    if (propChange) {
      if (value === 'static') {
        propChange(`${propsRootKey}`, {
          position: 'static',
        });
      } else {
        propChange(`${propsRootKey}.position`, value);
      }
    }
  };

  render() {
    const { propsRootKey = 'style', fold } = this.props;
    const { componentProps } = this.context;

    const value = ObPathImmutable.get(componentProps, `${propsRootKey}.position`, '');

    return (
      <Collapse defaultActiveKey={fold ? [] : ['1']}>
        <Collapse.Panel header="Position" key="1">
          <FlexCol>
            <FlexField>
              <Select propKey={`${propsRootKey}.position`} onChange={this.handleSelectChange}>
                <Select.Option value="static">static</Select.Option>
                <Select.Option value="relative">relative</Select.Option>
                <Select.Option value="absolute">absolute</Select.Option>
              </Select>
            </FlexField>
          </FlexCol>
          {(value === 'absolute' || value === 'relative') && (
            <FlexCol>
              <FlexField>
                <Input placeholder="top" numberPreferred propKey={`${propsRootKey}.top`} />
              </FlexField>
              <FlexField>
                <Input placeholder="left" numberPreferred propKey={`${propsRootKey}.left`} />
              </FlexField>
              <FlexField>
                <Input placeholder="right" numberPreferred propKey={`${propsRootKey}.right`} />
              </FlexField>
              <FlexField>
                <Input placeholder="bottom" numberPreferred propKey={`${propsRootKey}.bottom`} />
              </FlexField>
            </FlexCol>
          )}
        </Collapse.Panel>
      </Collapse>
    );
  }
}

export default Position;
