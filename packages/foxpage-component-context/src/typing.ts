import { FoxpageEmitter } from './context-addons/foxpage-emitter';

// User-defined context data
export interface ExternalContextType {
  [index: string]: any;
}

// foxpage system context data
export interface FoxpageContextType extends ExternalContextType {
  __VERSION__: string;
  FoxpageEmitter: typeof FoxpageEmitter;
}
