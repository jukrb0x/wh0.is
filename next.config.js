const path = require('path');
const UnoCSS = require('@unocss/webpack').default;

// TODO:
//  ref: https://github.com/spencerwooo/spencerwoo.com/blob/main/next.config.js
//  - headers, security options, og:image, etc.
//  - maybe: og in frontmatter, investigate nextra source code.
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config, context) {
        config.plugins.push(UnoCSS());
        config.optimization.realContentHash = true;
        config.cache = false; // always turn off the cache for UnoCSS HMR

        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, './src/styles')]
    },
    async redirects() {
        return [
            // backwards compatibility
            {
                source: '/p/:slug',
                destination: '/posts/:slug',
                permanent: true
            }
        ];
    }
};

const withNextra = require('nextra')({
    theme: './src/layouts',
    themeConfig: './theme.config.jsx',
    latex: true,
    staticImage: true,
    defaultShowCopyCode: true,
    readingTime: true
});

module.exports = withNextra(nextConfig);
