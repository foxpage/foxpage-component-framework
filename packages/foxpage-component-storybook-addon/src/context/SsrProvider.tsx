import React, { createContext, useContext, useMemo, ProviderProps } from 'react';

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

// 不做深度合并
function mergeOuterLocalCtx(outerCtx: Record<string, any>, localCtx: Record<string, any>): FoxpageSsrContextType {
  const resCtx = {
    ...outerCtx,
  };
  Object.keys(localCtx).forEach(key => {
    if (BaseSsrCtx[key]) {
      console.warn(`overrides BaseSsrCtx, key: ${key}!`);
    }
    resCtx[key] = localCtx[key];
  });
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
