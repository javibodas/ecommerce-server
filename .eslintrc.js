module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: ["import"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error"
  }
};
