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
    include: [/(styles|layouts).*\.(s?css|[jt]sx?)$/],
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
                'p': {
                    'margin-top': '1.25em',
                    'margin-bottom': '1.25em'
                },
                'a': {
                    'color': 'var(--fg-deeper)',
                    'font-weight': '500',
                    'text-decoration': ' none',
                    'border-bottom': '1px solid rgba(125, 125, 125, 0.3)',
                    'transition': 'border 0.3s ease-in-out'
                },
                'a:hover': {
                    // 'border-bottom': `1px solid var(${proseColors.fg})`
                    'border-bottom': '1px solid var(--fg)'
                },
                'a code': {
                    color: 'inherit'
                },
                'strong': {
                    'color': 'var(--fg-deep)',
                    'font-weight': '600'
                },
                'hr': {
                    'width': '50px',
                    'margin': '2em auto',
                    'border-color': 'rgba(125, 125, 125, 0.3)',
                    'margin-top': '3em',
                    'margin-bottom': '3em'
                },
                'img': {
                    width: '100%'
                },
                'code::before': {
                    content: 'none'
                },
                'code::after': {
                    content: 'none'
                },
                'blockquote': {
                    'border-left': 'inherit', // clean up defaults
                    'font-weight': 'normal',
                    'font-style': 'normal',
                    'color': 'inherit',
                    'line-height': '1.5em',
                    'border-left-width': '0.25rem',
                    'border-color': 'rgba(125, 125, 125, 0.3)',
                    'margin-top': '2.6em',
                    'margin-bottom': '1.6em',
                    'padding': '0.6em 1.2em',
                    'opacity': '0.8',
                    'quotes': "'\\201C''\\201D''\\2018''\\2019'"
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
