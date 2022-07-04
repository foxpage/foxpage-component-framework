import {
  paths,
  findProjectFilePath,
  findLocalPackageIndexFilePath,
  resolveRoot,
} from '@foxpage/foxpage-component-shared';
import { Config } from '@jest/types';
import { cpus } from 'os';

export interface CreateJestConfigOptions {
  mapLocalPackages?: boolean;
}

function findLocalPackageMapper() {
  return findLocalPackageIndexFilePath(['.ts', '.tsx', '.js', '.jsx']);
}

export const createJestConfig = (opt: CreateJestConfigOptions = {}) => {
  const { mapLocalPackages = false } = opt;
  const setupFilePath = findProjectFilePath(['.foxpage/jest/setup']);
  const setupFileAfterEnvPath = findProjectFilePath(['.foxpage/jest/setupEnv']);

  const config: Config.InitialOptions = {
    maxWorkers: cpus().length,
    verbose: !!process.env.DEBUG_JEST,
    rootDir: paths.root,
    roots: [paths.root],
    cache: true,
    cacheDirectory: resolveRoot('.cache/jest'),
    testEnvironment: 'enzyme',
    setupFilesAfterEnv: ['jest-enzyme', setupFileAfterEnvPath].filter(Boolean) as string[],
    setupFiles: [setupFilePath].filter(Boolean) as string[],
    testMatch: ['<rootDir>/packages/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': require.resolve('./transformer/babelTransform'),
      '^.+\\.(css|less|scss|sass)$': require.resolve('./transformer/cssTransform'),
      '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': require.resolve('./transformer/fileTransform'),
    },
    moduleNameMapper: {
      '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '!@svgr/webpack(\\??[^!]*)!(.+)': '$2',
    },
    watchPathIgnorePatterns: [
      '[/\\\\]dist[/\\\\].+\\.(js|jsx|ts|tsx)$',
      '[/\\\\]lib[/\\\\].+\\.(js|jsx|ts|tsx)$',
      '[/\\\\]es[/\\\\].+\\.(js|jsx|ts|tsx)$',
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    ],
    transformIgnorePatterns: [
      '[/\\\\]dist[/\\\\].+\\.(js|jsx|ts|tsx)$',
      '[/\\\\]lib[/\\\\].+\\.(js|jsx|ts|tsx)$',
      '[/\\\\]es[/\\\\].+\\.(js|jsx|ts|tsx)$',
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    modulePathIgnorePatterns: ['<rootDir>/package-templates/'],
    collectCoverageFrom: ['<rootDir>/packages/**/src/**/*.{ts,tsx,js,jsx}'],
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['text', 'text-summary', 'json-summary', 'lcov', 'clover'],
    reporters: [
      'default',
      [
        require.resolve('jest-html-reporter'),
        {
          outputPath: '<rootDir>/coverage/test-result.html',
        },
      ],
    ],
  };

  if (mapLocalPackages) {
    Object.assign(config.moduleNameMapper || {}, findLocalPackageMapper());
  }

  return config;
};
