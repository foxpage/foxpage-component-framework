declare module '@soda/friendly-errors-webpack-plugin' {
  import webpack from 'webpack';
  export default class FriendlyPlugin extends webpack.Plugin {}
}

declare module 'webpack-fix-style-only-entries' {
  import webpack from 'webpack';
  export default class FixStyleOnlyEntriesPlugin extends webpack.Plugin {}
}
