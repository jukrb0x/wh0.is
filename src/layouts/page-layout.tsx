import type { ReactNode } from 'react';

import { useBlogContext } from '@/layouts/blog-context';

import { BasicLayout } from './basic-layout';
import { MDXTheme } from './mdx-theme';

export const PageLayout = ({ children }: { children: ReactNode }) => {
    const { opts, config } = useBlogContext();
    return (
        <BasicLayout>
            <MDXTheme>{children}</MDXTheme>
            {opts.frontMatter.comment && config.comments}
        </BasicLayout>
    );
};
