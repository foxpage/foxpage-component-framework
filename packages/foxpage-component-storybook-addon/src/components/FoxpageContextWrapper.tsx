import React from 'react';
import { FoxpageCtxBaseProvider } from '@foxpage/foxpage-component-context';
import { ADDON_DECORATOR_NAME } from '../constant';
import { FoxpageSsrCtxBaseProvider } from '../context/SsrProvider';

export interface FoxpageContextWrapperProps {
  value: Record<string, any>;
}

const FoxpageContextWrapper: React.FC<FoxpageContextWrapperProps> = ({ value = {}, children }) => {
  return (
    <FoxpageSsrCtxBaseProvider value={{}}>
      <FoxpageCtxBaseProvider value={value}>{children}</FoxpageCtxBaseProvider>
    </FoxpageSsrCtxBaseProvider>
  );
};

FoxpageContextWrapper.displayName = ADDON_DECORATOR_NAME;

export default FoxpageContextWrapper;
