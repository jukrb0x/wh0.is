import ErrorPage from 'next/error';
import type { ReactNode } from 'react';

import { BasicLayout } from './basic-layout';
import { useBlogContext } from './blog-context';
import { MDXTheme } from './mdx-theme';
import Meta from './meta';

export const ArticleLayout = ({ children }: { children: ReactNode }) => {
    const { opts, config } = useBlogContext();
    return (
        <BasicLayout>
            <Meta />
            <MDXTheme>
                {children}
                {config.postFooter}
                {opts.frontMatter.comment && config.comments}
            </MDXTheme>
        </BasicLayout>
    );
};
