import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import _import from "eslint-plugin-import";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic-type-checked",
), {
    plugins: {
        react,
        "@typescript-eslint": typescriptEslint,
        "simple-import-sort": simpleImportSort,
        // import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },

            project: true,
        },
    },

    rules: {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/type-annotation-spacing": "warn",
        "arrow-spacing": "warn",
        "comma-spacing": "warn",
        "eol-last": "warn",
        "import/first": "warn",
        "import/newline-after-import": "warn",
        "import/no-duplicates": "warn",
        indent: ["warn", 2],
        "jsx-quotes": ["warn", "prefer-single"],

        "key-spacing": ["warn", {
            beforeColon: false,
        }],

        "keyword-spacing": "warn",
        "no-multi-spaces": "warn",

        "no-multiple-empty-lines": ["warn", {
            max: 1,
            maxBOF: 0,
            maxEOF: 0,
        }],

        "no-trailing-spaces": "warn",
        "no-whitespace-before-property": "warn",
        "object-curly-spacing": ["warn", "always"],
        "padded-blocks": ["warn", "never"],

        "padding-line-between-statements": ["warn", {
            blankLine: "always",
            prev: "*",
            next: ["block", "block-like", "return"],
        }, {
            blankLine: "always",
            prev: ["block", "block-like", "const", "import", "let"],
            next: "*",
        }, {
            blankLine: "never",
            prev: "import",
            next: "import",
        }, {
            blankLine: "any",
            prev: ["const", "let"],
            next: ["const", "let"],
        }],

        quotes: ["warn", "single"],

        "react/jsx-tag-spacing": ["warn", {
            beforeSelfClosing: "always",
        }],

        semi: "warn",
        "semi-spacing": "warn",
        "simple-import-sort/exports": "warn",

        "simple-import-sort/imports": ["warn", {
            groups: [["^\\u0000", "^@?\\w", "^[^.]", "^\\."]],
        }],

        "sort-keys": "warn",
        "space-infix-ops": "warn",
    },
}];