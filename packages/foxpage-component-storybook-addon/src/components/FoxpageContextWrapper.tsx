import React from 'react';
import { FoxpageCtxBaseProvider } from '@foxpage/foxpage-component-context';
import { ADDON_DECORATOR_NAME } from '../constant';
import { FoxpageSsrCtxBaseProvider } from '../context/SsrProvider';

export interface FoxpageContextWrapperProps {
  context: Record<string, any>;
  ssrContext: Record<string, any>;
}

const FoxpageContextWrapper: React.FC<FoxpageContextWrapperProps> = ({ context = {}, ssrContext = {}, children }) => {
  return (
    <FoxpageSsrCtxBaseProvider value={ssrContext}>
      <FoxpageCtxBaseProvider value={context}>{children}</FoxpageCtxBaseProvider>
    </FoxpageSsrCtxBaseProvider>
  );
};

FoxpageContextWrapper.displayName = ADDON_DECORATOR_NAME;

export default FoxpageContextWrapper;
