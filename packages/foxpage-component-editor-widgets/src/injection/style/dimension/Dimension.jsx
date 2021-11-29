import React, { Component } from 'react';

import Input from '../../../basic/input';
import FlexField from '../../../compose/group/FlexField';
import Label from '../../../compose/group/Label';
import FlexCol from '../../../compose/FlexCol';
import Collapse from '../../../compose/Collapse';

class Dimension extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { propsRootKey = 'style', fold } = this.props;
    return (
      <Collapse defaultActiveKey={fold ? [] : ['1']}>
        <Collapse.Panel header="Dimension" key="1">
          <FlexCol>
            <FlexField>
              <Label>Width</Label>
              <Input numberPreferred propKey={`${propsRootKey}.width`} />
            </FlexField>
            <FlexField>
              <Label>Min Width</Label>
              <Input numberPreferred propKey={`${propsRootKey}.minWidth`} />
            </FlexField>
            <FlexField>
              <Label>Max Width</Label>
              <Input numberPreferred propKey={`${propsRootKey}.maxWidth`} />
            </FlexField>
            <FlexField>
              <Label>Height</Label>
              <Input numberPreferred propKey={`${propsRootKey}.height`} />
            </FlexField>
            <FlexField>
              <Label>Min Height</Label>
              <Input numberPreferred propKey={`${propsRootKey}.minHeight`} />
            </FlexField>
            <FlexField>
              <Label>Max Height</Label>
              <Input numberPreferred propKey={`${propsRootKey}.maxHeight`} />
            </FlexField>
          </FlexCol>
        </Collapse.Panel>
      </Collapse>
    );
  }
}

export default Dimension;
