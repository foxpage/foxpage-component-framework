import React, { Component } from 'react';

import Input from '../../../basic/input';
import Select from '../../../basic/select';
import FlexField from '../../../compose/group/FlexField';
import Title from '../../../compose/group/Title';
import Label from '../../../compose/group/Label';
import FlexCol from '../../../compose/FlexCol';
import Collapse from '../../../compose/Collapse';

class Flex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { propsRootKey = 'style', fold } = this.props;
    return (
      <Collapse defaultActiveKey={fold ? [] : ['1']}>
        <Collapse.Panel header="Flex" key="1">
          <Title>Container</Title>
          <FlexCol>
            <FlexField>
              <Label>flexDirection</Label>
              <Select propKey={`${propsRootKey}.flexDirection`}>
                <Select.Option value="row">row</Select.Option>
                <Select.Option value="row-reverse">row-reverse</Select.Option>
                <Select.Option value="column">column</Select.Option>
                <Select.Option value="column-reverse">column-reverse</Select.Option>
              </Select>
            </FlexField>
            <FlexField>
              <Label>flexWrap</Label>
              <Select propKey={`${propsRootKey}.flexWrap`}>
                <Select.Option value="nowrap">nowrap</Select.Option>
                <Select.Option value="wrap">wrap</Select.Option>
                <Select.Option value="wrap-reverse">wrap-reverse</Select.Option>
              </Select>
            </FlexField>
            <FlexField>
              <Label>justifyContent</Label>
              <Select propKey={`${propsRootKey}.justifyContent`}>
                <Select.Option value="flex-start">flex-start</Select.Option>
                <Select.Option value="flex-end">flex-end</Select.Option>
                <Select.Option value="center">center</Select.Option>
                <Select.Option value="space-between">space-between</Select.Option>
                <Select.Option value="space-around">space-around</Select.Option>
                <Select.Option value="space-evenly">space-evenly</Select.Option>
              </Select>
            </FlexField>
            <FlexField>
              <Label>alignItems</Label>
              <Select propKey={`${propsRootKey}.alignItems`}>
                <Select.Option value="stretch">stretch</Select.Option>
                <Select.Option value="flex-start">flex-start</Select.Option>
                <Select.Option value="flex-end">flex-end</Select.Option>
                <Select.Option value="center">center</Select.Option>
                <Select.Option value="baseline">baseline</Select.Option>
              </Select>
            </FlexField>
            <FlexField>
              <Label>alignContent</Label>
              <Select propKey={`${propsRootKey}.alignContent`}>
                <Select.Option value="flex-start">flex-start</Select.Option>
                <Select.Option value="flex-end">flex-end</Select.Option>
                <Select.Option value="center">center</Select.Option>
                <Select.Option value="space-between">space-between</Select.Option>
                <Select.Option value="space-around">space-around</Select.Option>
                <Select.Option value="stretch">stretch</Select.Option>
              </Select>
            </FlexField>
          </FlexCol>
          <Title style={{ marginTop: 20 }}>Items</Title>
          <FlexCol>
            <FlexField>
              <Label>flex-grow</Label>
              <Input numberPreferred propKey={`${propsRootKey}.flexGrow`} />
            </FlexField>
            <FlexField>
              <Label>flex-shrink</Label>
              <Input numberPreferred propKey={`${propsRootKey}.flexShrink`} />
            </FlexField>
            <FlexField>
              <Label>flex-basis</Label>
              <Input numberPreferred propKey={`${propsRootKey}.flexBasis`} />
            </FlexField>
            <FlexField>
              <Label>align-self</Label>
              <Select propKey={`${propsRootKey}.alignSelf`}>
                <Select.Option value="auto">auto</Select.Option>
                <Select.Option value="stretch">stretch</Select.Option>
                <Select.Option value="center">center</Select.Option>
                <Select.Option value="flex-start">flex-start</Select.Option>
                <Select.Option value="flex-end">flex-end</Select.Option>
                <Select.Option value="baseline">baseline</Select.Option>
              </Select>
            </FlexField>
          </FlexCol>
        </Collapse.Panel>
      </Collapse>
    );
  }
}

export default Flex;
