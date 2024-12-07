const globals = require("globals");
const pluginJs = require("@eslint/js");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: "commonjs",
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended
];
