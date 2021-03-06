module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "plugin:vue/essential",
    "standard",
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
      "no-console": "off",
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}