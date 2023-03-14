module.exports = {
  extends: ['@utopia/eslint-config-react', '@utopia/eslint-config-react/hooks'],
  rules: {
    'import/no-extraneous-dependencies': 0
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json', 'packages/*/tsconfig.json']
      },
      node: {
        project: ['tsconfig.json', 'packages/*/tsconfig.json']
      }
    }
  }
};
