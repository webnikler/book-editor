module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    ['@babel/plugin-proposal-export-default-from'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  parserOpts: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
};
