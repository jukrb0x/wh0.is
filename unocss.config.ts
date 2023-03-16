// import transformerDirectives from '@unocss/transformer-directives';
import {
    defineConfig,
    presetIcons,
    presetUno,
    presetWebFonts,
    transformerDirectives
} from 'unocss';

export default defineConfig({
    include: [/(styles|lib|pages).*\.(s?css|[jt]sx?)$/],
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
        })
    ]
});
