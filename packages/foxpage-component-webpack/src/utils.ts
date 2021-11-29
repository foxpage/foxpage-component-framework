import { findPath, logger } from '@foxpage/foxpage-component-shared';

export interface FindEntryOptions {
  indexFileNames?: string[];
}

export const findEntry = (context: string, opt: FindEntryOptions = {}) => {
  const { indexFileNames = ['index.js', 'index.ts', 'src/index.js', 'src/index.ts'] } = opt;
  const pkgPath = findPath(context, ['package.json']);

  if (!pkgPath) {
    logger.warn(`${context} miss package.json`);
    return;
  }
  const indexPath = findPath(context, indexFileNames);
  if (!indexPath) {
    logger.warn(`ignore ${context} because can't find index file from "${indexFileNames.join(',')}"`);
    return;
  }
  return indexPath;
};
