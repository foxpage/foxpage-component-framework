import { webpackBaseConfig, WebpackBaseConfigOption } from './config.base';
import merge from 'webpack-merge';
import webpack, { Configuration } from 'webpack';
import { join } from 'path';
import { findEntry } from './utils';

export interface WebpackEditorOption extends WebpackBaseConfigOption {
  library: string;
}

export const webpackEditorConfig = (context: string, opt: WebpackEditorOption): Configuration => {
  const entry = findEntry(context, {
    indexFileNames: ['editor/index.ts', 'editor/index.js'],
  });
  if (!entry) {
    throw new Error(`${context} can't find entry for editor`);
  }
  const { outputPath, outputFileName, library, useFileHash } = opt;

  const editorConfig: webpack.Configuration = {
    mode: 'none',
    devtool: false,
    entry: entry,
    target: 'web',
    output: {
      path: outputPath || join(context, 'dist/umd'),
      filename: outputFileName || (useFileHash && 'editor.[contenthash].js') || 'editor.js',
      library: `${library}_editor`,
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: "(typeof window !== 'undefined' ? window : this)",
    },
    optimization: {
      namedModules: true,
    },
  };
  return merge(
    webpackBaseConfig(context, 'editor', {
      ...opt,
      extractCSS: false,
      useStyleLoader: true,
      useDefaultEntry: false,
    }) as any,
    editorConfig as any,
  ) as Configuration;
};
