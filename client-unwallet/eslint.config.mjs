import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Ignore unused variables
      "@typescript-eslint/no-unused-vars": "off",

      // Ignore explicit any types
      "@typescript-eslint/no-explicit-any": "off",

      // Ignore missing dependencies in useEffect
      "react-hooks/exhaustive-deps": "off",

      // Ignore img element warnings
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
