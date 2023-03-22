import ErrorPage from 'next/error';
import type { ReactNode } from 'react';

import { BasicLayout } from './basic-layout';
import { useBlogContext } from './blog-context';
import { MDXTheme } from './mdx-theme';
import Meta from './meta';

export const ArticleLayout = ({ children }: { children: ReactNode }) => {
    const { opts, config } = useBlogContext();
    const isDraft = opts.frontMatter.draft === true;
    if (isDraft) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <BasicLayout>
            <Meta />
            <MDXTheme>
                {children}
                {config.postFooter}
                {config.comments}
            </MDXTheme>
        </BasicLayout>
    );
};
