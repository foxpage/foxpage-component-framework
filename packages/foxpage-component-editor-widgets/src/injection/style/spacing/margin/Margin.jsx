import React from 'react';
import Input from '../../../../basic/input';
import Title from '../../../../compose/group/Title';
import FlexCol from '../../../../compose/FlexCol';
import FlexField from '../../../../compose/group/FlexField';

function Margin(props = {}) {
  const { propsRootKey = 'style' } = props;
  return (
    <div style={{ marginBottom: 8 }}>
      <Title>Margin</Title>
      <FlexCol>
        <FlexField>
          <Input placeholder="marginTop" numberPreferred propKey={`${propsRootKey}.marginTop`} />
        </FlexField>
        <FlexField>
          <Input placeholder="marginLeft" numberPreferred propKey={`${propsRootKey}.marginLeft`} />
        </FlexField>
        <FlexField>
          <Input placeholder="marginRight" numberPreferred propKey={`${propsRootKey}.marginRight`} />
        </FlexField>
        <FlexField>
          <Input placeholder="marginBottom" numberPreferred propKey={`${propsRootKey}.marginBottom`} />
        </FlexField>
      </FlexCol>
    </div>
  );
}

export default Margin;
