module.exports = {
    filepath: '{**/*,*}.{js,jsx,ts,tsx,css,scss,html,json,md,mdx,yml,yaml}',
    pluginSearchDirs: ['.'],
    trailingComma: 'none',
    semi: true,
    singleQuote: true,
    printWidth: 100,
    useTabs: false,
    tabWidth: 4,
    quoteProps: 'consistent',
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrder: ['<THIRD_PARTY_MODULES>', '^@/', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    bracketSpacing: true
};
