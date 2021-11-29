import { transform } from '@babel/core';
import { TransformStyleImportPluginOptions } from './transform-style-import';

const parseCode = (code: string, opt: TransformStyleImportPluginOptions = {}) => {
  const res = transform(code, {
    plugins: [[require('./transform-style-import'), opt]],
    babelrc: false,
    configFile: false,
    cwd: __dirname,
  });
  return res;
};

const createAssert = (opt: TransformStyleImportPluginOptions) => (code: string, expectCode: string) => {
  const result = parseCode(code, opt);
  expect(result?.code).toBe(expectCode);
};

describe('babel-plugin/transform-style', () => {
  it('remove import style', () => {
    const opt: TransformStyleImportPluginOptions = { removeStyleImport: true };
    const assert = createAssert(opt);
    assert(`import "index.scss";`, '');
  });
});
