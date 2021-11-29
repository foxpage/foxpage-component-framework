import { join, isAbsolute } from 'path';
import { platform } from 'os';
import { pathExistsSync, readdirSync, existsSync, writeJSON, readFileSync } from 'fs-extra';
import JSON5 from 'json5';
import { logger } from './logger';
import { getKey } from './utils';
import { IPackageJson } from 'package-json-type';

const formatToPosix = (sourcePath: string) => {
  if (platform() === 'win32') {
    return sourcePath.replace(/\\/g, '/');
  }
  return sourcePath;
};

export const loadFile = <T = any>(path?: string): T | undefined => {
  if (!path) {
    return;
  }
  if (path.endsWith('.json')) {
    try {
      return JSON5.parse(readFileSync(path, { encoding: 'utf8' }));
    } catch (error) {}
  }
  try {
    const exported = require(path);
    return exported && exported.default ? exported.default : exported;
  } catch (error) {
    logger.debug('load file: "%s" fail', path, error);
    return;
  }
};

export const findPath = (baseDir?: string, mayPaths: string[] = []) => {
  if (!baseDir || mayPaths.length === 0) {
    return;
  }
  const filePath = mayPaths
    .map(_path => join(baseDir, _path))
    .map(formatToPosix)
    .find(v => {
      try {
        return pathExistsSync(v);
      } catch (error) {
        return false;
      }
    });
  return filePath;
};

export const findPackages = (
  root: string,
  packageRootDirNames = ['packages'],
  { exclude = [], include }: { exclude?: string[]; include?: string[] } = {},
) => {
  const findDirPackages = (root: string) => {
    const dirs = readdirSync(root)
      .filter(dirName => !exclude.includes(dirName))
      .filter(dirName => include?.includes(dirName) ?? true)
      .map(dirname => join(root, dirname));
    return dirs;
  };

  const dirs = packageRootDirNames
    .map(pkgDir => join(root, pkgDir))
    .filter(dir => pathExistsSync(dir))
    .map(dir => findDirPackages(dir))
    .reduce<string[]>((all, packageDirs) => all.concat(packageDirs), [])
    .filter(dir => pathExistsSync(join(dir, 'package.json')));
  return dirs;
};

export const requireProjectModule = <T = any>(moduleName: string): T => {
  return require(require.resolve(moduleName, { paths: [projectRoot] }));
};

export const isProjectRoot = (pathname: string) => !!findPath(pathname, ['.git', 'packages', 'package']);

export const cwd = process.cwd();
export const cwdIsProjectRoot = isProjectRoot(cwd);
const projectRoot = cwdIsProjectRoot ? cwd : join(cwd, '../..');

logger.debug('project root: %s', projectRoot);

export const resolveRoot = (...paths: string[]) => join(projectRoot, ...paths);

export const isRootContext = (context: string) => {
  return findPath(context, ['packages']);
};

export const existModule = (moduleName: string) => {
  return existsSync(resolveRoot('node_modules', moduleName));
};

export function readPackageInfo(dirPath: string): IPackageJson | undefined;
export function readPackageInfo<K extends keyof IPackageJson>(dirPath: string, key?: K): IPackageJson[K] | undefined;
export function readPackageInfo<T = any>(dirPath: string, key?: string): T | undefined {
  const packageJson = loadFile(join(dirPath, 'package.json'));
  if (packageJson) {
    if (!key) {
      return packageJson;
    }
    return getKey<T>(packageJson, key);
  }
}

export async function updatePackageJson(dirPath: string, cb: (json: IPackageJson) => IPackageJson) {
  const jsonPath = join(dirPath, 'package.json');
  const packageJson = loadFile(jsonPath);
  if (packageJson) {
    const newJson = cb(packageJson);
    await writeJSON(jsonPath, newJson, { spaces: 2 });
  }
}

export const toAbsolutePath = (pathname: string, base: string) => {
  return isAbsolute(pathname) ? pathname : join(base, pathname);
};

export const resolveExtensions = (pathnameList: string[], extensions: string[]) => {
  return pathnameList
    .map(pathName => extensions.map(ext => pathName + (ext.startsWith('.') ? '' : '.') + ext))
    .reduce((all, cur) => {
      return all.concat(cur);
    }, []);
};
