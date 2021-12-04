import React, { createContext, useContext, useMemo, ProviderProps } from 'react';
import _merge from 'lodash/merge';

// foxpage ssr context data
export interface FoxpageSsrContextType {
  [index: string]: any;
}

const BaseSsrCtx: FoxpageSsrContextType = {};

const FoxpageSsrContext = createContext<FoxpageSsrContextType>(BaseSsrCtx);
const { Provider: FoxpageSsrContextProvider } = FoxpageSsrContext;

export const FoxpageSsrContextConsumer = FoxpageSsrContext.Consumer;

export const useFoxpageSsrContext = () => {
  return useContext(FoxpageSsrContext);
};

function mergeOuterLocalCtx(outerCtx: Record<string, any>, localCtx: Record<string, any>): FoxpageSsrContextType {
  const resCtx = _merge({}, outerCtx, localCtx);
  return resCtx as FoxpageSsrContextType;
}

export const FoxpageSsrCtxOverridesProvider: React.FC<ProviderProps<FoxpageSsrContextType>> = ({
  value = {},
  children,
}) => {
  const outCtx = useFoxpageSsrContext();
  const ctx = useMemo<FoxpageSsrContextType>(() => {
    return mergeOuterLocalCtx(outCtx, value);
  }, [outCtx, value]);
  return <FoxpageSsrContextProvider value={ctx}>{children}</FoxpageSsrContextProvider>;
};

export const FoxpageSsrCtxBaseProvider: React.FC<ProviderProps<FoxpageSsrContextType>> = ({ value = {}, children }) => {
  const rootCtx = useMemo<FoxpageSsrContextType>(() => {
    return {
      ...mergeOuterLocalCtx(BaseSsrCtx, value),
    };
  }, [value]);
  return <FoxpageSsrContextProvider value={rootCtx}>{children}</FoxpageSsrContextProvider>;
};
