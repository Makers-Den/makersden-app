module.exports = {
  extends: ["next", "turbo", "prettier"],
  plugins: ["simple-import-sort", "prefer-arrow"],
  ignorePatterns: ["dist/**"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prefer-arrow/prefer-arrow-functions": [
      "warn",
      {
        "disallowPrototype": true,
        "singleReturnOnly": false,
        "classPropertiesAllowed": false
      }
    ]
  },
};
