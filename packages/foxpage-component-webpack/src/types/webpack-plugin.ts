declare module '@soda/friendly-errors-webpack-plugin' {
  import webpack from 'webpack';
  export default class FriendlyPlugin extends webpack.Plugin {
    constructor(opt?: any);
  }
}

declare module 'webpack-fix-style-only-entries' {
  import webpack from 'webpack';
  export default class FixStyleOnlyEntriesPlugin extends webpack.Plugin {}
}

declare module 'webpack-dynamic-public-path' {
  import webpack from 'webpack';
  export default class WebpackDynamicPublicPathPlugin extends webpack.Plugin {
    constructor(opt?: any);
  }
}

declare module 'webpack-manifest-plugin' {
  import webpack from 'webpack';
  export interface WebpackManifestPluginOption {
    publicPath?: null | string;
    basePath?: string;
    fileName?: string;
    transformExtensions?: RegExp;
    writeToFileEmit?: boolean;
    seed?: string;
    filter?: null;
    map?: null;
    sort?: null;
    generate?: (
      seed: Record<string, any>,
      files: Array<{
        path: string;
        name: string | null;
        isInitial: boolean;
        isChunk: boolean;
        chunk?: webpack.ChunkData;
        isAsset: boolean;
        isModuleAsset: boolean;
      }>,
      entryPoints: string[],
    ) => any;
    serialize?: (manifest: Record<string, string>) => string;
  }

  export default class WebpackManifestPlugin extends webpack.Plugin {
    constructor(opt?: WebpackManifestPluginOption);
  }
}
