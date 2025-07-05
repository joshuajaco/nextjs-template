import path from "node:path";
import { includeIgnoreFile } from "@eslint/compat";
import ts from "typescript-eslint";
import js from "@eslint/js";
import globals from "globals";
import { importX } from "eslint-plugin-import-x";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import next from "@next/eslint-plugin-next";
import tailwind from "eslint-plugin-better-tailwindcss";

const eslintConfig = ts.config(
  includeIgnoreFile(path.join(import.meta.dirname, ".gitignore")),
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  react.configs.flat.recommended ?? {},
  reactHooks.configs["recommended-latest"],
  next.flatConfig.coreWebVitals,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser, ...globals.node, ...globals.es2024 },
    },
    plugins: {
      import: importX,
      "jsx-a11y": jsxA11y,
      "better-tailwindcss": tailwind,
    },
    settings: {
      react: { version: "detect" },
      "better-tailwindcss": { entryPoint: "src/app/globals.css" },
    },
    rules: {
      ...tailwind.configs.recommended?.rules,
      "better-tailwindcss/enforce-consistent-variable-syntax": "warn",
      "import/no-anonymous-default-export": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "import/order": ["error", { "newlines-between": "never" }],
      "import/newline-after-import": "error",

      // Require === and !== instead of == and !=, except when comparing to null.
      eqeqeq: ["error", "always", { null: "ignore" }],

      // Allow unused variables when they are rest siblings.
      // E.g., filter `a` from `obj` `const { a, ...rest } = obj;`
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],

      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "jsx-a11y/alt-text": ["warn", { elements: ["img"], img: ["Image"] }],
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
      "react/jsx-no-target-blank": "off",
      "react/no-array-index-key": "warn",
      "react/self-closing-comp": ["warn", { component: true, html: true }],
    },
  },
);

export default eslintConfig;
