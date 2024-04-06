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
        const redirects = [
            // backwards compatibility
            {
                source: '/p/:slug',
                destination: '/posts/:slug',
                permanent: true
            }
        ];
        // use private drafts in local development
        if (process.env.NODE_ENV == 'development') {
            redirects.push({
                source: '/posts/:slug',
                destination: '/drafts/:slug',
                permanent: true
            });
        }
        return redirects;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                pathname: '/u/**'
            },
            {
                protocol: 'https',
                hostname: 'docs.unrealengine.com',
                pathname: '/**/*'
            }
        ]
    }
};

const withNextra = require('nextra')({
    theme: './src/layouts',
    themeConfig: './theme.config.tsx',
    latex: true,
    staticImage: true,
    defaultShowCopyCode: true,
    readingTime: true
});

module.exports = withNextra(nextConfig);
