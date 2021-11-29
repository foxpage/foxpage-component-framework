const fs = require('fs');
const { join, sep } = require('path');

const isRoot = (dir) => fs.existsSync(join(dir, 'node_modules'));

function findProjectRoot() {
  let root = join(__dirname, '..');
  while (!isRoot(root) && root.length > 1) {
    root = root.substr(0, root.lastIndexOf(sep));
  }
  return root;
}

function findPackagesDir() {
  const root = findProjectRoot();
  const lernaJson = root && join(root, 'lerna.json');
  const packagesDir = root && join(root, 'packages');
  if (fs.existsSync(packagesDir) && fs.existsSync(lernaJson)) {
    return packagesDir;
  }
}

module.exports = {
  findProjectRoot,
  findPackagesDir,
};
