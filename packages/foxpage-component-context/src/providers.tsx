import React, { useMemo, ProviderProps } from 'react';
import _merge from 'lodash/merge';

import { FoxpageContextProvider, BaseCtx } from './context';
import { FoxpageContextType, ExternalContextType } from './typing';
import { useFoxpageContext } from './hooks';

// 不做深度合并
function mergeOuterLocalCtx(outerCtx: Record<string, any>, localCtx: Record<string, any>): FoxpageContextType {
  const _localCtx = {
    ...localCtx,
  };
  Object.keys(_localCtx).forEach(key => {
    if (BaseCtx[key]) {
      console.error("Can't overrides foxpage base context!");
      delete _localCtx[key];
    }
  });
  const resCtx = _merge({}, outerCtx, _localCtx);
  return resCtx as FoxpageContextType;
}

export const FoxpageCtxOverridesProvider: React.FC<ProviderProps<ExternalContextType>> = ({ value = {}, children }) => {
  const outCtx = useFoxpageContext();
  const ctx = useMemo<FoxpageContextType>(() => {
    return mergeOuterLocalCtx(outCtx, value);
  }, [outCtx, value]);
  return <FoxpageContextProvider value={ctx}>{children}</FoxpageContextProvider>;
};

export const FoxpageCtxBaseProvider: React.FC<ProviderProps<ExternalContextType>> = ({ value = {}, children }) => {
  const rootCtx = useMemo<FoxpageContextType>(() => {
    return {
      ...mergeOuterLocalCtx(BaseCtx, value),
    };
  }, [value]);
  return <FoxpageContextProvider value={rootCtx}>{children}</FoxpageContextProvider>;
};
