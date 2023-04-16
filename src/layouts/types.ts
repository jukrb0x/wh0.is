import type { PageOpts } from 'nextra';
import type { Components } from 'nextra/mdx';
import type { ReactNode } from 'react';

export interface NextraBlogTheme {
    comments?: ReactNode;
    components?: Components;
    cusdis?: {
        appId: string;
        host?: string;
        lang: string;
    };
    darkMode?: boolean;
    footer?: ReactNode;
    head?: ({ meta, title }: { meta: Record<string, any>; title: string }) => ReactNode;
    navs?: {
        name: string;
        url: string;
    }[];
    postFooter?: string;
    readMore?: string;
    titleSuffix?: string;
    showDescription?: boolean;
}

export type BlogPageOpts = PageOpts<BlogFrontMatter>;

export type BlogFrontMatter = {
    author?: string;
    back?: string;
    date?: string;
    description?: string;
    tag?: string | string[];
    title?: string;
    type?: 'post' | 'page' | 'posts' | 'tag' | 'home' | 'friends';
    lang?: 'en' | 'zh';
    draft?: boolean;
    order?: number; // navbar sorting
};

export interface LayoutProps {
    config: NextraBlogTheme;
    opts: BlogPageOpts;
}
