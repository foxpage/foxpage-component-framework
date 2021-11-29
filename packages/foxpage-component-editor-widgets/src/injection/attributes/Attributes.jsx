import React from 'react';
import Collapse from '../../compose/Collapse';
import Field from '../../compose/group/Field';
import Label from '../../compose/group/Label';
import Input from '../../basic/input';
import JSONEditor from '../../advanced/json-editor';

const Attributes = (props = {}) => {
  const { fold, propsRootKey = 'attributes' } = props;
  return (
    <Collapse defaultActiveKey={fold ? [] : ['attributes']}>
      <Collapse.Panel header="Common HTML Attributes" key="attributes">
        <Field>
          <Label>id</Label>
          <Input propKey={`${propsRootKey}.id`} />
        </Field>
        <Field>
          <Label>class (className)</Label>
          <Input propKey={`${propsRootKey}.className`} />
        </Field>
        <Field style={{ marginTop: 24 }}>
          <Label>Attributes JSON Object Editor (class should be replaced by className)</Label>
          <JSONEditor propKey={propsRootKey} />
        </Field>
      </Collapse.Panel>
    </Collapse>
  );
};

export default Attributes;
