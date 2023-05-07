import '@unocss/reset/tailwind.css';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import 'uno.css';
import 'yet-another-react-lightbox/styles.css';

import NProgress from '@/layouts/components/progress-indicator';
import '@/styles/code-block.scss';
import '@/styles/global.scss';
import '@/styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <NProgress delayMs={300} />
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}
