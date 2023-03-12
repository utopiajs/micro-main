module.exports = {
  extends: ['@utopia/eslint-config-react', '@utopia/eslint-config-react/hooks'],
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
