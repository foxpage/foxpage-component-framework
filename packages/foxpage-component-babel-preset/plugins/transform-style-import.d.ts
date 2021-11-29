import { PluginObj } from '@babel/core';

export interface TransformStyleImportPluginOptions {
  removeStyleImport?: boolean;
}

declare const plugin: (api: any) => PluginObj;

export default plugin;
