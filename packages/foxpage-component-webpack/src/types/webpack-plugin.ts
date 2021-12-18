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
