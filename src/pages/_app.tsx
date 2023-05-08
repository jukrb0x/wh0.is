import '@unocss/reset/tailwind.css';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import 'uno.css';
import 'yet-another-react-lightbox/styles.css';

import type ProgressIndicator from '@/layouts/components/progress-indicator';
import '@/styles/code-block.scss';
import '@/styles/global.scss';
import '@/styles/main.scss';

const NProgress = dynamic(import('@/layouts/components/progress-indicator'), {
    ssr: false
}) as typeof ProgressIndicator;

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <NProgress delayMs={0} />
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}
