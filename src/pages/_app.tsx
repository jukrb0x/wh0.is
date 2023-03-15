// import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import 'uno.css';

import '@/styles/main.css';
import '@/styles/markdown.css';
import '@/styles/nextra-defaults.css';
import '@/styles/prose.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
