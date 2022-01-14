import merge from 'webpack-merge';
import webpack, { Configuration } from 'webpack';
import { join } from 'path';
import { findEntry } from './utils';
import { webpackBaseConfig, WebpackBaseConfigOption } from './config.base';
import { ModeFileNameMap } from './constants';
export interface WebpackEditorOption extends WebpackBaseConfigOption {
  library: string;
}

export const webpackEditorConfig = (context: string, opt: WebpackEditorOption): Configuration => {
  const entryFile = findEntry(context, {
    indexFileNames: ['editor/index.ts', 'editor/index.js'],
  });
  if (!entryFile) {
    throw new Error(`${context} can't find entry for editor`);
  }
  const entry = {
    [ModeFileNameMap['editor']]: entryFile,
  };
  const { outputPath, outputFileName, library, useFileHash } = opt;
  const fileName =
    outputFileName ||
    (useFileHash && `${ModeFileNameMap['editor']}.[contenthash].js`) ||
    `${ModeFileNameMap['editor']}.js`;
  const editorConfig: webpack.Configuration = {
    mode: 'none',
    devtool: false,
    entry,
    target: 'web',
    output: {
      path: outputPath || join(context, 'dist'),
      filename: fileName,
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
      // debug: force to set
      extractCSS: false,
      useStyleLoader: true,
      useDefaultEntry: false,
    }) as any,
    editorConfig as any,
  ) as Configuration;
};
