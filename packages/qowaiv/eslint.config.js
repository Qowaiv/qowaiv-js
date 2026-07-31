import js from "@eslint/js";
import { defineConfig, includeIgnoreFile } from "eslint/config";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(
  new URL("../../.gitignore", import.meta.url),
);

export default defineConfig([
  includeIgnoreFile(gitignorePath, {
    gitignoreResolution: true,
    name: ".gitignore",
  }),
  {
    files: ["**/*.{js,ts}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic,
    ],
  },
]);
