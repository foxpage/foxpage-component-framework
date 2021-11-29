import { useEffect } from 'react';
import { FoxpageEmitter } from './index';

export const useFoxpageEmitter = () => {
  return FoxpageEmitter;
};

export const useFoxpageEventListen = (event: string | undefined, listener: (...args: any[]) => void, context?: any) => {
  useEffect(() => {
    if (!event || !listener) {
      return;
    }
    FoxpageEmitter.on(event, listener, context);
    return () => {
      FoxpageEmitter.off(event, listener, context);
    };
  }, [event, listener, context]);
};
