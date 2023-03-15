// import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import 'uno.css';

import '@/styles/nextra-defaults.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
