import { GeistProvider } from '@geist-ui/core';
import { ThemeProvider, useTheme } from 'next-themes';
import type { NextraThemeLayoutProps } from 'nextra';
import type { ReactElement, ReactNode } from 'react';

import { HomeLayout } from '@/layouts/home-layout';

import { ArticleLayout } from './article-layout';
import { BlogProvider } from './blog-context';
import { DEFAULT_THEME } from './constants';
import { PageLayout } from './page-layout';
import { PostsLayout } from './posts-layout';
import type { LayoutProps } from './types';

const layoutMap = {
    home: HomeLayout,
    post: ArticleLayout,
    page: PageLayout,
    posts: PostsLayout,
    tag: PostsLayout
};

const BlogLayout = ({
    config,
    children,
    opts
}: LayoutProps & { children: ReactNode }): ReactElement => {
    const type = opts.frontMatter.type || 'post';
    const { resolvedTheme } = useTheme();
    const Layout = layoutMap[type];
    if (!Layout) {
        throw new Error(
            `Layout Type is not currently supported: ${type}. Please use one of the following: ${Object.keys(
                layoutMap
            ).join(', ')}`
        );
    }
    return (
        <GeistProvider themeType={resolvedTheme === 'dark' ? 'dark' : 'light'}>
            <BlogProvider opts={opts} config={config}>
                <Layout>{children}</Layout>
            </BlogProvider>
        </GeistProvider>
    );
};

export default function Layout({ children, ...context }: NextraThemeLayoutProps) {
    const extendedConfig = { ...DEFAULT_THEME, ...context.themeConfig };

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <BlogLayout config={extendedConfig} opts={context.pageOpts}>
                {children}
            </BlogLayout>
        </ThemeProvider>
    );
}

export { useTheme } from 'next-themes';
export { useBlogContext } from './blog-context';
export { getStaticTags } from './utils/get-tags';
export * from './types';
