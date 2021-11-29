const fs = require('fs');
const path = require('path');
const semver = require('semver');
const { findPackagesDir } = require('./utils');

const tsLintPkgJson = require('@typescript-eslint/eslint-plugin/package.json');
const engines = tsLintPkgJson && tsLintPkgJson.engines && tsLintPkgJson.engines.node;
const supportTsLint = engines ? matchVersion(engines) : true;
const packagesDir = findPackagesDir();

function matchVersion(supportNodes = '') {
  const nodeVersion = process.version;
  const supportVersions = supportNodes.split('||').map(v => v.trim());
  if (supportVersions.length === 0) {
    return true;
  }
  return supportVersions.some(ver => {
    try {
      return semver.satisfies(nodeVersion, ver);
    } catch (error) {
      return false;
    }
  });
}

const exist = (filename) => fs.existsSync(path.join(process.cwd(), filename));

const usePrettier = exist('.prettierrc') || exist('.prettierrc.js');

/** @type {import('eslint').Linter.RuleOverride<import('eslint').Linter.RulesRecord>} */
const tsOverride = {
  files: ['**/*.ts', '**/*.tsx'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    // typescript-eslint specific options
    warnOnUnsupportedTypeScriptVersion: true,
  },
  // If adding a typescript-eslint version of an existing ESLint rule,
  // make sure to disable the ESLint rule here.
  rules: {
    // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
    'default-case': 'off',
    // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
    'no-dupe-class-members': 'off',

    // Add TypeScript specific rules (and turn off ESLint equivalents)
    '@typescript-eslint/consistent-type-assertions': 'warn',
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'warn',
    '@typescript-eslint/no-namespace': 'error',
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'warn',
    '@typescript-eslint/no-unused-vars': ['off', {
      'argsIgnorePattern': '^_'
    }],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/no-empty-interface': ['off'],
    '@typescript-eslint/indent': ['off'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/class-name-casing': 'off',
  },
};

// @see https://github.com/benmosher/eslint-plugin-import#resolvers
const importResolver = {
  'node': {
    'extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
  },
};

if (packagesDir) {
  importResolver['eslint-import-resolver-lerna'] = {
    packages: packagesDir,
  }
}

/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint-config-airbnb',
    'plugin:import/typescript',
    supportTsLint && 'plugin:@typescript-eslint/eslint-recommended',
    supportTsLint && 'plugin:@typescript-eslint/recommended',
    usePrettier && 'prettier/@typescript-eslint',
    usePrettier && 'plugin:prettier/recommended',
  ].filter(Boolean),
  plugins: [
    'react-hooks',
    '@typescript-eslint/eslint-plugin',
    usePrettier && 'prettier',
  ].filter(Boolean),
  settings: {
    'import/resolver': importResolver,
  },
  overrides: [tsOverride],
  rules: {
    // react
    'react/forbid-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
    'react/no-string-refs': 'off',
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',

    // import
    'import/extensions': ['warn', {
      'scss': 'always',
      'less': 'always',
      'css': 'always',
      'js': 'never',
      'jsx': 'never',
      'ts': 'never',
      'tsx': 'never',
      'd.ts': 'never'
    }],
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/order': 'off',

    // a11y
    'jsx-a11y/anchor-is-valid': ['error', {
      'components': [ 'Link' ],
      'specialLink': [ 'hrefLeft', 'hrefRight', 'to' ],
      'aspects': [ 'noHref', 'invalidHref', 'preferButton' ]
    }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/anchor-has-content': 'off',

    // common
    'max-len': ['warn', 150, 2,
      {
        'ignoreComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true
      }
    ],
    'class-methods-use-this': 'off',
    'camelcase': [ 'off', {'properties': 'never'} ],
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'prefer-destructuring': 'off',
    'arrow-parens': 'off',
    'arrow-body-style': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-case-declarations': 'off',
    'require-atomic-updates': 'off',
    'global-require': 'off',
    'no-empty': ['error', {
      'allowEmptyCatch': true
    }],
  }
};
