// import transformerDirectives from '@unocss/transformer-directives';
import path from 'path';
import {
    defineConfig,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives
} from 'unocss';

const includedPath = path.join(__dirname, 'src', 'styles');

export default defineConfig({
    // include: [/(styles)(\/.*)*\/.*\.(s?css|[jt]sx?)$/],
    exclude: [],
    transformers: [
        transformerDirectives({
            enforce: 'pre'
        })
    ],
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
        }),
        presetTypography({
            cssExtend: {
                // '.prose': {
                //     // '--fg': '#555',
                //     // '--fg-deep': '#222',
                //     // '--fg-deeper': '#000',
                //     'color': 'var(--fg)'
                // },
                'a': {
                    'color': 'var(--fg-deeper)',
                    'font-weight': 'inherit',
                    'text-decoration': ' none',
                    'border-bottom': '1px solid rgba(125, 125, 125, 0.3)',
                    'transition': 'border 0.3s ease-in-out'
                },
                'a:hover': {
                    // 'border-bottom': `1px solid var(${proseColors.fg})`
                    'border-bottom': '1px solid var(--fg)'
                },
                'hr': {
                    width: '50px',
                    margin: '2em auto'
                },
                'a code': {
                    color: 'inherit'
                },
                'img': {
                    width: '100%'
                },
                'blockquote': {
                    'font-weight': 'normal',
                    'font-style': 'normal',
                    'line-height': '1.5em',
                    'padding': '0.6em 1.2em',
                    'opacity': '0.8'
                },
                'blockquote > :first-child ': {
                    'margin-top': '0'
                },
                'blockquote > :last-child ': {
                    'margin-bottom': '0'
                },
                'blockquote p:first-of-type::before': {
                    content: 'none'
                },
                'blockquote p:last-of-type::after': {
                    content: 'none'
                }
            }
        })
    ]
});
