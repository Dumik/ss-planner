module.exports = {
  arrowParens: "always",
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: "all",
  tabWidth: 2,
  jsxSingleQuote: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: ["^react(.*)$", "<THIRD_PARTY_MODULES>", "^[./]"],
};
