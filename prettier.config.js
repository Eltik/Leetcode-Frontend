/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    plugins: ["prettier-plugin-tailwindcss"],
    tabWidth: 4,
    printWidth: 300,
    proseWrap: "never",
    endOfLine: "lf",
    semi: true,
    singleQuote: false,
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
    useTabs: false,
};
