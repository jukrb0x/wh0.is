import Head from 'next/head';
import type { ReactNode } from 'react';
import { useRef } from 'react';

import ThemeSwitch from '@/layouts/theme-switch';

import { useBlogContext } from './blog-context';
import { HeadingContext } from './mdx-theme';
import NavBar from './nav-bar';

/**
 * Basic Layout for other layouts
 * The base component
 */
export const BasicLayout = ({ children }: { children: ReactNode }) => {
    const { config, opts } = useBlogContext();
    const title = `${opts.title}${config.titleSuffix || ''}`;
    const ref = useRef<HTMLHeadingElement>(null);
    return (
        <div className={'font-sans'}>
            <NavBar />
            <article className="container mx-auto prose dark:prose-dark md:prose" dir="ltr">
                <Head>
                    <title>{title}</title>
                    {config.head?.({ title, meta: opts.frontMatter })}
                </Head>
                <HeadingContext.Provider value={ref}>
                    {opts.hasJsxInH1 ? <h1 ref={ref} /> : null}
                    {opts.hasJsxInH1 ? null : <h1>{opts.title}</h1>}
                    {children}
                    {config.footer}
                </HeadingContext.Provider>
            </article>
        </div>
    );
};
