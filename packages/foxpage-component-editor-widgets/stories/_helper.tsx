import React, { useState, useRef, useMemo } from 'react';
import { EditContext, EditContextType } from '@foxpage/foxpage-component-editor-context';
import * as widgets from '@foxpage/foxpage-component-editor-widgets';
import * as ObPathImmutable from 'object-path-immutable';
import JsonView from 'react-json-view';
import { Button, Typography } from 'antd';
import { isVariables } from '../src/utils/variables';

export const EditorProvider: React.FC<{ props?: Record<string, any> }> = ({ props = {}, children }) => {
  const [propVal, setPropVal] = useState(props);
  const oldProps = useRef<any>([]);
  const oldPropsHelper = useMemo(() => {
    return {
      push: (data: any) => {
        oldProps.current.push(data);
        if (oldProps.current.length > 10) {
          oldProps.current.shift();
        }
      },
      pop: () => {
        return oldProps.current.pop();
      },
    };
  }, []);
  const context: EditContextType = {
    widgets: widgets as any,
    componentProps: propVal,
    propChange: (k, v) => {
      setPropVal((data: any) => {
        oldPropsHelper.push(data);
        return ObPathImmutable.set(data || {}, k, v);
      });
    },
    propsChange: updated => {
      setPropVal((data: any) => {
        oldPropsHelper.push(data);
        return { ...data, ...updated };
      });
    },
    applyState: (...args) => {
      console.debug('applyState', ...args);
    },
    onBindVariable: (
      k: string,
      option = {
        // string
        // object
        // html-string
        // ?: string-object, boolean
        type: 'string',
        desc: '',
      },
    ) => {
      setPropVal((data: any) => {
        oldPropsHelper.push(data);
        const val = ObPathImmutable.get(data || {}, k);
        if (option.type === 'string') {
          if (isVariables(val)) {
            return ObPathImmutable.del(data || {}, k);
          }
          return ObPathImmutable.set(data || {}, k, '{{mockVariable}}');
        }
        if (option.type === 'object') {
          const newVal = {
            ...val,
          };
          if (newVal.mockVar) {
            delete newVal.mockVar;
          } else {
            newVal.mockVar = '{{mockVariable}}';
          }
          return ObPathImmutable.set(data || {}, k, newVal);
        }
        if (option.type === 'html-string') {
          if (isVariables(val, { isMulti: true })) {
            return ObPathImmutable.del(data || {}, k);
          }
          return ObPathImmutable.set(data || {}, k, '<strong>{{mockVariable}}</strong>');
        }
      });
    },
  };
  const onBack = () => {
    if (oldProps.current) {
      const pre = oldPropsHelper.pop();
      if (pre) {
        setPropVal(pre);
      }
    }
  };
  return (
    <EditContext.Provider value={context}>
      {children}
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <Button disabled={!(oldProps.current && oldProps.current.length > 0)} onClick={onBack}>
          回退(剩余{oldProps.current.length}步)
        </Button>
        <Typography>Props:</Typography>
        <JsonView
          src={propVal}
          style={{
            height: '100px',
          }}
        />
      </div>
    </EditContext.Provider>
  );
};
