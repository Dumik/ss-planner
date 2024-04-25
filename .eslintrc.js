module.exports = {
  extends: ['custom/next'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'tailwindcss/no-custom-classname': [
      2,
      {
        config: require('./tailwind.config.js'),
      },
    ],
  },
  ignorePatterns: ['cypress']
};
