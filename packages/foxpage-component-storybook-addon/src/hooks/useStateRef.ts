import { useState, useRef, useCallback, Dispatch, SetStateAction, MutableRefObject } from 'react';

import { getAbsoluteTypes } from '../utils/helper';

export const useStateRef = <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>] => {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);
  const setStateHandle = useCallback((val: S | ((pre?: S) => S)) => {
    if (typeof val === 'function') {
      // Not all constituents of type '(() => S) | (S & Function)' are callable.
      const temp = val as (pre?: S) => S;
      stateRef.current = temp(stateRef.current);
    } else {
      stateRef.current = val;
    }
    setState(val);
  }, []);
  return [state, setStateHandle as Dispatch<SetStateAction<S>>, stateRef];
};

// 仅接收对象类型，且在 setState 时 覆盖旧对象
export const useStateCoverRef = <S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<Partial<S>>>, MutableRefObject<S>] => {
  const [state, setState, stateRef] = useStateRef(initialState);
  const setStateHandle = useCallback(obj => {
    if (getAbsoluteTypes(obj) !== 'object') {
      setState(obj);
    } else {
      setState(pre => ({
        ...pre,
        ...obj,
      }));
    }
  }, []);
  return [state, setStateHandle, stateRef];
};
