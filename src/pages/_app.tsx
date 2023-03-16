import '@unocss/reset/tailwind.css';
import type { AppProps } from 'next/app';
import 'uno.css';

import '@/styles/code-block.scss';
import '@/styles/global.css';
import '@/styles/shiki.css';
import '@/styles/style.css';
import '@/styles/subheading-anchor.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
