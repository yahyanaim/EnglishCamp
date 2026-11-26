// Flat config for ESLint 9+ (Next.js 16 removed `next lint`). Same rules and scope as the former .eslintrc.json.
import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...coreWebVitals,
  { files: ["src/lib/courseProgress.ts"], rules: { "@next/next/no-assign-module-variable": "off" } },
  // eslint-plugin-react-hooks 7 (shipped with eslint-config-next 16) adds React Compiler rules that the previous
  // config never ran. They flag existing, working patterns (126 places); adopting them is a separate refactor.
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/refs": "off",
      "react-hooks/immutability": "off",
      "react-hooks/preserve-manual-memoization": "off",
    },
  },
  { ignores: [".next/**", ".cloudflare-build/**", "node_modules/**", "public/**", "out/**"] },
];

export default config;
