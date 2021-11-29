import babelJest from 'babel-jest';
import { paths } from '@foxpage/foxpage-component-shared';

export = babelJest.createTransformer({
  babelrc: false,
  configFile: paths.babelConfigJS,
});
