declare global {
  const __FOXPAGE_COMPONENT_CONTEXT_VERSION__: string;
  interface Window {
    __FOXPAGE_CONTEXT_EVENTEMITTER__: any;
  }
}

export {};
