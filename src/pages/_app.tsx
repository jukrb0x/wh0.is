import '@unocss/reset/tailwind.css';
import type { AppProps } from 'next/app';
import 'uno.css';

import '@/styles/global.scss';
import '@/styles/shiki.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
