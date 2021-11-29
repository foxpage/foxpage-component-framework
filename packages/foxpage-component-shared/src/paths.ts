import { existsSync } from 'fs';
import { join, isAbsolute } from 'path';
import { pathExistsSync } from 'fs-extra';
import { resolveRoot, findPackages, readPackageInfo } from './path';

export const paths = {
  root: resolveRoot('.'),
  packageJson: resolveRoot('package.json'),
  babelConfigJS: resolveRoot('babel.config.js'),
};

export const findProjectFilePath = (mayFiles: string[], extensions = ['js', 'ts'], root = paths.root) => {
  const mayFilePaths = mayFiles.reduce((all, filePath) => {
    return all.concat(
      extensions.map(ext => (filePath.endsWith(ext) ? filePath : `${filePath}${ext.startsWith('.') ? '' : '.'}${ext}`)),
    );
  }, [] as string[]);
  const filePath = mayFilePaths.map(filename => join(root, filename)).find(pathExistsSync);
  return filePath;
};

export const getPackageAbsolutePath = (pkgName: string) => {
  return isAbsolute(pkgName) ? pkgName : resolveRoot('packages', pkgName);
};

export function findLocalPackageIndexFilePath(indexFileExtensions = ['.ts', '.js', '.tsx', '.jsx']) {
  const localPackages = findPackages(paths.root);
  const indexFiles: Record<string, string> = localPackages.reduce((files: Record<string, string>, pkgDir) => {
    const existSrc = existsSync(join(pkgDir, 'src'));
    const pkgName = readPackageInfo(pkgDir, 'name');
    if (existSrc && pkgName) {
      const key = pkgName;
      const filePath = findProjectFilePath(['src/index', 'index'], indexFileExtensions, pkgDir);
      if (key && filePath && existsSync(filePath)) {
        files[key] = filePath;
      }
    }
    return files;
  }, {});
  return indexFiles;
}
