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
                        <td className="border px-4 py-2">{value && value.toString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export const DebugInfo = (props: LayoutProps) => {
    const [hidden, setHidden] = useState(false);
    const [expand, setExpand] = useState(false);
    const [pinned, setPinned] = useState(false);
    const togglePinned = () => setPinned(!pinned);

    const ref = useRef<HTMLDivElement>(null);
    const { opts, config } = props;
    const { frontMatter } = opts;
    const offset = 28; /*px*/

    // expand the debug info on mouse enter
    useEffect(() => {
        if (!ref.current) return;
        const height = ref.current.clientHeight;
        const bottom = pinned || expand ? 0 : height - offset;
        ref.current.style.bottom = `-${bottom}px`;
    }, [expand, hidden, ref, frontMatter, pinned]);

    // return nothing if not in dev mode
    if (!isDev) return null;

    // return nothing if the debug info is hidden
    if (hidden) return null;

    return (
        <div
            ref={ref}
            className={clsx(
                'flex space-between fixed left-0 z-50 px-5 py-1 w-full text-xs text-white font-mono',
                pinned ? 'bg-indigo-600' : 'bg-orange hover:bg-indigo-600',
                'opacity-80 hover:opacity-95 transition-all'
            )}
            onMouseEnter={() => setExpand(true)}
            onMouseLeave={() => setExpand(false)}
        >
            {/* indicator */}
            <div className={'mr-2'}>
                <div className={'px-1 font-bold border rounded-md'}>DEV</div>
            </div>

            {/* debug info */}
            <div className={'grow'}>{GenerateTableFromJson(frontMatter)}</div>

            {/* buttons */}
            <div className={'flex flex-col justify-between ml-2'}>
                <button
                    className={clsx(
                        'grow-1',
                        'text-xs text-white font-mono px-4 border rounded-md bg-transparent',
                        'hover:text-red hover:bg-white transition-all'
                    )}
                    onClick={() => setHidden(true)}
                >
                    X
                </button>

                <button
                    className={'border rounded-md px-1 grow-2 mt-1'}
                    onClick={() => togglePinned()}
                >
                    <span
                        className={pinned ? 'i-ph:lock-simple-fill' : 'i-ph:lock-simple-open'}
                    ></span>
                </button>
            </div>
        </div>
    );
};
