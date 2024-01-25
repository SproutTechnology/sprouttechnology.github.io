module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/jsx-runtime",
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
    },
    ignorePatterns: ["node_modules", "public", "dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
    },
};
