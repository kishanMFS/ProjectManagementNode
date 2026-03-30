import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import eslintRecommended from "@eslint/js";
import globals from "globals";

export default [
  // Base recommended rules from ESLint
  eslintRecommended.configs.recommended,

  // TypeScript plugin rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest"
      },
      globals: {
        ...globals.node,     // Node.js globals like process, console, __dirname
        ...globals.es2021    // ES2021 built-ins like globalThis, BigInt
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
    
  }
];
