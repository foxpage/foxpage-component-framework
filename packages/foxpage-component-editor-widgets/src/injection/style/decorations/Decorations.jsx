import React, { Component } from 'react';

import Input from '../../../basic/input';
import Collapse from '../../../compose/Collapse';
import FlexField from '../../../compose/group/FlexField';
import Label from '../../../compose/group/Label';
import Title from '../../../compose/group/Title';
import FlexCol from '../../../compose/FlexCol';

class Decorations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { propsRootKey = 'style', fold } = this.props;
    return (
      <Collapse defaultActiveKey={fold ? [] : ['1']}>
        <Collapse.Panel header="Decorations" key="1">
          <Title>Radius</Title>
          <FlexCol>
            <FlexField>
              <Label>TopLeft</Label>
              <Input numberPreferred propKey={`${propsRootKey}.borderTopLeftRadius`} />
            </FlexField>
            <FlexField>
              <Label>TopRight</Label>
              <Input numberPreferred propKey={`${propsRootKey}.borderTopRightRadius`} />
            </FlexField>
            <FlexField>
              <Label>BottomRight</Label>
              <Input numberPreferred propKey={`${propsRootKey}.borderBottomRightRadius`} />
            </FlexField>
            <FlexField>
              <Label>BottomLeft</Label>
              <Input numberPreferred propKey={`${propsRootKey}.borderBottomLeftRadius`} />
            </FlexField>
            <FlexField>
              <Label>BackgroundColor</Label>
              <Input numberPreferred propKey={`${propsRootKey}.backgroundColor`} />
            </FlexField>
          </FlexCol>
        </Collapse.Panel>
      </Collapse>
    );
  }
}

export default Decorations;
