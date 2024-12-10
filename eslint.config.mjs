import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: "module",
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
];
