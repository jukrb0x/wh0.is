import clsx from 'clsx';
import { useState } from 'react';

import { isDev } from '@/layouts/utils/env';

import type { LayoutProps } from '../types';

export const DebugInfo = (props: LayoutProps) => {
    const [hidden, setHidden] = useState(false);

    if (!isDev) return null;

    const { opts, config } = props;
    const { frontMatter } = opts;

    console.log('Page Meta:');
    console.table(frontMatter);

    if (hidden) return null;
    return (
        <div
            className={clsx(
                'flex space-between fixed bottom-0 left-0 z-50 px-5 py-1 w-full text-xs text-white font-mono',
                'bg-orange opacity-80 hover:opacity-100 transition-all',
                'hover:text-lg hover:bg-red'
            )}
        >
            <div className={'grow'}>
                <span className={'font-bold'}>[DEV]</span> {JSON.stringify(frontMatter)}
            </div>
            <div>
                <button
                    className={'ml-2 text-xs text-white font-mono'}
                    onClick={() => setHidden(true)}
                >
                    [X]
                </button>
            </div>
        </div>
    );
};
