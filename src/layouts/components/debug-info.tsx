import clsx from 'clsx';
import { ReactElement, useEffect, useRef, useState } from 'react';

import { isDev } from '@/layouts/utils/env';

import type { LayoutProps } from '../types';

const GenerateTableFromJson = (json: Object): ReactElement => {
    return (
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="px-4 pb-2">Key</th>
                    <th className="px-4 pb-2">Value</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(json).map(([key, value]) => (
                    <tr key={key}>
                        <td className="border px-4 py-2">{key}</td>
                        <td className="border px-4 py-2">{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export const DebugInfo = (props: LayoutProps) => {
    const [hidden, setHidden] = useState(false);
    const [expand, setExpand] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const { opts, config } = props;
    const { frontMatter } = opts;
    const offset = 25; /*px*/

    // expand the debug info on mouse enter
    useEffect(() => {
        if (!ref.current) return;
        const height = ref.current.clientHeight;
        const bottom = expand ? 0 : height - offset;
        ref.current.style.bottom = `-${bottom}px`;
    }, [expand, hidden, ref.current, frontMatter]);

    // return nothing if not in dev mode
    if (!isDev) return null;

    // return nothing if the debug info is hidden
    if (hidden) return null;

    return (
        <div
            ref={ref}
            className={clsx(
                'flex space-between fixed left-0 z-50 px-5 py-1 w-full text-xs text-white font-mono',
                'bg-orange opacity-80 hover:opacity-95 hover:bg-indigo-600 transition-all'
            )}
            onMouseEnter={() => setExpand(true)}
            onMouseLeave={() => setExpand(false)}
        >
            <div className={'mr-2 flex-col flex'}>
                <div className={'px-1 font-bold border rounded-md'}>DEV</div>
                <button className={'border rounded-md px-1 my-1'}>
                    <span className={'i-ph:lock-simple-open-fill'}></span>
                </button>
            </div>
            <div className={'grow'}>{GenerateTableFromJson(frontMatter)}</div>
            <div className={'flex'}>
                <button
                    className={clsx(
                        'ml-2 text-xs text-white font-mono px-4 border rounded-md bg-transparent',
                        'hover:text-red hover:bg-white transition-all'
                    )}
                    onClick={() => setHidden(true)}
                >
                    X
                </button>
            </div>
        </div>
    );
};
