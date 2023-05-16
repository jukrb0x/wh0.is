import ErrorPage from 'next/error';
import Head from 'next/head';
import type { ReactNode } from 'react';
import { useRef } from 'react';

import { Back } from '@/layouts/components';
import { getParent } from '@/layouts/utils/parent';

import { useBlogContext } from './blog-context';
import { HeadingContext } from './mdx-theme';
import NavBar from './nav-bar';
import { ShouldPreviewDraft } from './utils/env';

/**
 * Basic Layout for other layouts
 * The base component
 */
export const BasicLayout = ({ children }: { children: ReactNode }) => {
    const { config, opts } = useBlogContext();
    const title = `${opts.title}${config.titleSuffix || ''}`;
    const ref = useRef<HTMLHeadingElement>(null);
    const { back } = getParent({ opts, config });

    const isDraft = opts.frontMatter.draft === true;

    if (isDraft && !ShouldPreviewDraft()) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <div className={'font-sans'}>
            <NavBar />
            <div className="container mx-auto prose dark:prose-invert" dir="ltr">
                <Head>
                    <title>{title}</title>
                    {config.head?.({ title, meta: opts.frontMatter })}
                    {opts.frontMatter.image && (
                        // TODO: static import support
                        <>
                            <meta property="og:image" content={opts.frontMatter.image} />
                            <meta property="og:image:width" content="1280" />
                            <meta property="og:image:height" content="720" />
                            <meta property="twitter:card" content="summary_large_image" />
                            <meta property="twitter:title" content={opts.frontMatter.title} />
                            <meta
                                property="twitter:description"
                                content={opts.frontMatter.description}
                            />
                            <meta name="twitter:image" content={opts.frontMatter.image} />
                        </>
                    )}
                    {config.siteName && <meta name="og:site_name" content={config.siteName} />}
                </Head>
                <HeadingContext.Provider value={ref}>
                    <article>
                        {opts.frontMatter.draft && (
                            <div className={'mb-2'}>
                                <span className="text-sm border border-solid border-current rounded px-1 pb-0.2 align-middle">
                                    Draft
                                </span>
                            </div>
                        )}
                        {opts.hasJsxInH1 ? <h1 ref={ref} /> : null}
                        {opts.hasJsxInH1 ? null : <h1>{opts.title}</h1>}
                        {children}
                    </article>
                    {back && <Back href={back} />}
                    {config.footer}
                </HeadingContext.Provider>
            </div>
        </div>
    );
};
