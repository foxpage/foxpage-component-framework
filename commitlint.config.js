'use strict';

module.exports = {
    extends: ['@commitlint/config-angular'],
    rules: {
      "header-max-length": [0, "always", 100],
      "type-enum": [
        2,
        'always',
        [
          'build',
          'ci',
          'docs',
          'feat',
          'fix',
          'perf',
          'refactor',
          'chore',
          'style',
          'test'
        ]
      ],
    },
};
