// eslint.config.ts
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import type { Linter } from 'eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig: Linter.Config[] = [
  {
    ignores: [
      '.open-next/**',
      '.next/**',
      '.wrangler/**',
      'node_modules/**',
      'next-env.d.ts',
      'prettier.config.mjs',
      'cloudflare-env.d.ts',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {},
    files: ['src/**/*.{ts,tsx}'],
  },
  eslintPluginPrettierRecommended,
];

export default eslintConfig;
