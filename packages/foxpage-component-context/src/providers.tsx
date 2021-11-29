import React, { useMemo, ProviderProps } from 'react';

import { FoxpageContextProvider, BaseCtx } from './context';
import { FoxpageContextType, ExternalContextType } from './typing';
import { useFoxpageContext } from './hooks';

// 不做深度合并
function mergeOuterLocalCtx(outerCtx: Record<string, any>, localCtx: Record<string, any>): FoxpageContextType {
  const resCtx = {
    ...outerCtx,
  };
  Object.keys(localCtx).forEach(key => {
    if (BaseCtx[key]) {
      console.error("Can't overrides foxpage base context!");
    } else {
      resCtx[key] = localCtx[key];
    }
  });
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
