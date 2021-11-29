import { createContext } from 'react';
import { FoxpageEmitter } from './context-addons/foxpage-emitter';
import { FoxpageContextType } from './typing';

// base context, can't be overwritten
export const BaseCtx: FoxpageContextType = {
  __VERSION__: __FOXPAGE_COMPONENT_CONTEXT_VERSION__,
  FoxpageEmitter,
};

const FoxpageContext = createContext<FoxpageContextType>(BaseCtx);
const { Consumer: FoxpageContextConsumer, Provider: FoxpageContextProvider } = FoxpageContext;

export { FoxpageContext, FoxpageContextProvider, FoxpageContextConsumer };
