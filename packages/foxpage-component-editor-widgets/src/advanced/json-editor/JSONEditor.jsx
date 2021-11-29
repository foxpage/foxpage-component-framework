import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import JSONEditor from 'jsoneditor';
import styled from 'styled-components';
import * as ObPathImmutable from 'object-path-immutable';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import { useEditContext } from '@foxpage/foxpage-component-editor-context';
import VariableBtn from '../../components/VariableComp/VariableBtn';
import { isVariables } from '../../utils/variables';

import 'jsoneditor/dist/jsoneditor.css';
import './JSONEditor.css';

const OptionsBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-bottom: 8px;
  & > & {
    margin-left： 8px;
  }
`;

const DefaultValue = {};
const Option = {
  type: 'object',
};

const ReactJSONEditor = (props = {}) => {
  const { propKey, mergedStyle, hideVariableBtn, onChange, onBlur } = props;
  const { componentProps, propChange, propsChange, applyState } = useEditContext();
  const isInit = useRef(false);
  const container = useRef(null);
  const jsonEditor = useRef(null);
  const curValue = useRef(DefaultValue);
  const propsRef = useRef({
    propKey,
    mergedStyle,
    onChange,
    onBlur,
  });
  const ctxRef = useRef({
    propChange,
    propsChange,
    applyState,
  });
  useMemo(() => {
    propsRef.current = {
      propKey,
      mergedStyle,
      onChange,
      onBlur,
    };
  }, [propKey, mergedStyle, onChange, onBlur]);
  useMemo(() => {
    ctxRef.current = {
      propChange,
      propsChange,
      applyState,
    };
  }, [propChange, propsChange, applyState]);
  const propsValue = useMemo(() => {
    return ObPathImmutable.get(componentProps, propKey, DefaultValue);
  }, [componentProps, propKey]);

  const handlePropChange = useCallback(
    debounce(value => {
      curValue.current = value;
      if (propsRef.current.propKey && ctxRef.current.propChange) {
        ctxRef.current.propChange(propsRef.current.propKey, value);
      }
      // invoke props onChange
      if (propsRef.current.onChange) {
        propsRef.current.onChange(value);
      }
    }, 500),
    [],
  );
  // handle value change by outer
  useEffect(() => {
    if (isInit.current) {
      if (!isEqual(propsValue, curValue.current)) {
        jsonEditor.current.set(propsValue);
        curValue.current = propsValue;
      }
    }
  }, [propsValue]);
  useEffect(() => {
    isInit.current = true;
    if (typeof propKey === 'undefined') {
      return;
    }
    const value = propsValue || DefaultValue;
    const options = {
      mode: 'code',
      history: false,
      enableSort: false,
      enableTransform: false,
      onChange: () => {
        if (jsonEditor.current) {
          try {
            const currentValue = jsonEditor.current.get();
            handlePropChange(currentValue);
          } catch (e) {
            console.warn('JSON parse error, input is not a json');
          }
        }
      },
      onBlur: () => {
        if (propsRef.current.onBlur) {
          propsRef.current.onBlur();
        }
      },
    };

    jsonEditor.current = new JSONEditor(container.current, options);
    jsonEditor.current.set(value);
    curValue.current = value;
    return () => {
      if (jsonEditor.current) {
        jsonEditor.current.destroy();
      }
    };
  }, []);
  const content = <div style={mergedStyle} className="jsoneditor-react-container" ref={container} />;
  if (hideVariableBtn) return content;
  const active = isVariables(JSON.stringify(propsValue), { isMulti: true });
  return (
    <div>
      <OptionsBox>
        <VariableBtn propKey={propKey} active={active} option={Option} size="small" />
      </OptionsBox>
      {content}
    </div>
  );
};

export default ReactJSONEditor;
