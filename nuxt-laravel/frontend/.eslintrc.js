module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "vue/multi-word-component-names": false,
    "vue/no-multiple-template-root": "off",
    "prettier/prettier": ["error", { singleQuote: true, semi: false }],
  },
  workingDirectories: [{ mode: "auto" }],
};
