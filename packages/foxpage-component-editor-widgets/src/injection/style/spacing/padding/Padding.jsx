import React from 'react';
import Input from '../../../../basic/input';
import Title from '../../../../compose/group/Title';
import FlexCol from '../../../../compose/FlexCol';
import FlexField from '../../../../compose/group/FlexField';

function Padding(props = {}) {
  const { propsRootKey = 'style' } = props;
  return (
    <div style={{ marginBottom: 8 }}>
      <Title>Padding</Title>
      <FlexCol>
        <FlexField>
          <Input placeholder="paddingTop" numberPreferred propKey={`${propsRootKey}.paddingTop`} />
        </FlexField>
        <FlexField>
          <Input placeholder="paddingLeft" numberPreferred propKey={`${propsRootKey}.paddingLeft`} />
        </FlexField>
        <FlexField>
          <Input placeholder="paddingRight" numberPreferred propKey={`${propsRootKey}.paddingRight`} />
        </FlexField>
        <FlexField>
          <Input placeholder="paddingBottom" numberPreferred propKey={`${propsRootKey}.paddingBottom`} />
        </FlexField>
      </FlexCol>
    </div>
  );
}

export default Padding;
