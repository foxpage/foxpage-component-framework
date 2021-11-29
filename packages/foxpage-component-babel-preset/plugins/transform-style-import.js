const path = require('path');
const STYLE_EXTENSIONS = ['.css', '.scss', '.sass', '.less'];

/**
 * @param {import('@babel/core').NodePath<import('@babel/types').ImportDeclaration>} nodePath
 */
function checkBeforeRemoveStyleImport(nodePath) {
  const specifiers = nodePath.get('specifiers');

  if (specifiers.length) {
    const specifier = specifiers[specifiers.length - 1];
    // import a from './index.less';
    if (specifier.isImportDefaultSpecifier()) {
      console.error(`${nodePath.node.source.value} should not be imported using default imports.`);
    }
    // import { a } from './index.less';
    if (specifier.isImportSpecifier()) {
      console.error(`${nodePath.node.source.value} should not be imported using named imports.`);
    }
    // import * as a from './index.less';
    if (specifier.isImportNamespaceSpecifier()) {
      console.error(`${nodePath.node.source.value} should not be imported using namespace imports.`);
    }
  }
}

/** @type {(api: { types: typeof import('@babel/core').types}) => import('@babel/core').PluginObj} */
const transformer = ({ types }) => {
  /** @type {import('@babel/core').PluginObj} */
  const pluginObj = {
    visitor: {
      ImportDeclaration: {
        enter(nodePath, state) {
          const { removeStyleImport = false } = state.opts || {};
          if (!removeStyleImport) return; // quick quit

          const importPath = nodePath.node.source.value;
          if (!(importPath && typeof importPath === 'string')) return;

          const ext = path.extname(importPath);
          if (!STYLE_EXTENSIONS.includes(ext)) return;

          if (removeStyleImport) {
            checkBeforeRemoveStyleImport(nodePath);
            nodePath.remove();
          }
        },
      },
    },
  };

  return pluginObj;
};

module.exports = transformer;
module.exports.default = transformer;
