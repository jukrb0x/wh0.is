const { presetWebFonts, presetUno, presetIcons } = require('unocss');
const UnoCSS = require('@unocss/webpack').default;

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
        config.plugins.push(
            // UnoCSS -------
            UnoCSS({
                presets: [
                    presetUno(),
                    presetWebFonts({
                        fonts: {
                            sans: 'Inter:400,600,800',
                            mono: 'DM Mono'
                        }
                    }),
                    presetIcons({
                        extraProperties: {
                            'display': 'inline-block',
                            'height': '1.2em',
                            'width': '1.2em',
                            'vertical-align': 'text-bottom'
                        }
                    })
                ]
            })
        );

        if (context.buildId !== 'development') {
            // * disable filesystem cache for build
            // * https://github.com/unocss/unocss/issues/419
            // * https://webpack.js.org/configuration/cache/
            config.cache = false;
        }

        return config;
    }
    // sassOptions: {
    //   includePaths: [path.join(__dirname, 'styles')],
    // },
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
