import '@unocss/reset/tailwind.css';
import type { AppProps } from 'next/app';
import 'uno.css';

import '@/styles/main.css';
import '@/styles/markdown.css';
import '@/styles/nextra-defaults.scss';
import '@/styles/prose.css';
import '@/styles/shiki.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
