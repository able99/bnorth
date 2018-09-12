let cache;

function initBabelOption(options) {
  cache = {
    "presets": [
      require('@babel/preset-react'),
      require('@babel/preset-env'),
    ],
    "plugins": [
      require('@babel/plugin-transform-runtime'),
      require('babel-plugin-add-module-exports'),
      require('@babel/plugin-syntax-dynamic-import'),
      require('@babel/plugin-syntax-import-meta'),
      require('@babel/plugin-proposal-class-properties'),
      [require('@babel/plugin-proposal-decorators'),{"legacy": true}],
      require('@babel/plugin-proposal-function-sent'),
      require('@babel/plugin-proposal-export-namespace-from'),
      require('@babel/plugin-proposal-numeric-separator'),
      require('@babel/plugin-proposal-throw-expressions'),
      require('@babel/plugin-proposal-export-default-from'),
      require('@babel/plugin-proposal-logical-assignment-operators'),
      require('@babel/plugin-proposal-optional-chaining'),
      [require('@babel/plugin-proposal-pipeline-operator'),{"proposal": "minimal"}],
      require('@babel/plugin-proposal-nullish-coalescing-operator'),
      require('@babel/plugin-proposal-do-expressions'),
    ]
  }

  return cache;
}

function getBabelOption() {
  return cache;
}

module.exports = {
  initBabelOption, getBabelOption
}
