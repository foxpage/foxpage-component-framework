import React from 'react';
import Collapse from '../../../compose/Collapse';
import Padding from './padding';
import Margin from './margin';

const Spacing = (props = {}) => {
  const { propsRootKey, fold } = props;
  return (
    <Collapse defaultActiveKey={fold ? [] : ['1']}>
      <Collapse.Panel header="Spacing" key="1">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <Margin propsRootKey={propsRootKey} />
          <Padding propsRootKey={propsRootKey} />
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default Spacing;
