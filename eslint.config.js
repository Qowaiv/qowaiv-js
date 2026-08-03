import js from '@eslint/js';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import { fileURLToPath, URL } from 'node:url';

const pathToGitIgnore = fileURLToPath(new URL('.gitignore', import.meta.url));

export default defineConfig([
  includeIgnoreFile(pathToGitIgnore, {
    gitignoreResolution: true,
    name: 'Qowaiv .gitignore entries',
  }),
  {
    files: ['**/*.{js,ts}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic,
      prettier,
    ],
  },
]);
