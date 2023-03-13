const UnoCSS = require('@unocss/webpack').default;
const presetUno = require('@unocss/preset-uno').default;
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    reactStrictMode: true,
    // TODO:
    //  ref: https://github.com/spencerwooo/spencerwoo.com/blob/main/next.config.js
    //  - headers, security options
    //  - redirects from soem old sources
    webpack(config, context) {
        config.plugins.push(UnoCSS({ presets: [presetUno()] }));

        if (context.buildId !== 'development') {
            // * disable filesystem cache for build
            // * https://github.com/unocss/unocss/issues/419
            // * https://webpack.js.org/configuration/cache/
            config.cache = false;
        }

        return config;
    }
};

const withNextra = require('nextra')({
    theme: './src/layouts',
    themeConfig: './theme.config.jsx',
    // extra
    staticImage: true,
    defaultShowCopyCode: true,
    readingTime: true
});

module.exports = withNextra(nextConfig);
