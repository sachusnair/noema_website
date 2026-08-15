import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  /* The Worker is its own package with its own deps and tsconfig, and it never
     ships with the site. It is linted and typechecked from inside /worker. */
  { ignores: [".next/**", "out/**", "build/**", "next-env.d.ts", "worker/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
