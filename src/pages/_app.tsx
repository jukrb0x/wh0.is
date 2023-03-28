import '@unocss/reset/tailwind.css';
import type { AppProps } from 'next/app';
import 'uno.css';

// code-block.scss must go in this file
import '@/styles/code-block.scss';
import '@/styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
