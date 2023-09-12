module.exports = {
  extends: ['@utopia/eslint-config-react', '@utopia/eslint-config-react/hooks'],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'react/prop-types': 0,
    'func-call-spacing': 0,
    'func-spaced-func': 0
  },
  globals: {
    jsdom: true,
    JSX: true
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
