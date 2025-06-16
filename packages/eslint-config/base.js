import js from "@eslint/js";
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import eslintConfigESLint from 'eslint-config-eslint'

export const config = defineConfig([
    eslintConfigESLint,
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
        plugins: {
            turbo: turboPlugin,
        },
        rules: {
            "turbo/no-undeclared-env-vars": "warn",
            "@typescript-eslint/consistent-type-imports": "error"
        },
    },
    {
        plugins: {},
    },
    {
        ignores: ["dist/**"],
    },
])
