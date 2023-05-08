import type { PageOpts } from 'nextra';
import type { Components } from 'nextra/mdx';
import type { ReactNode } from 'react';

export interface NextraBlogThemeConfig {
    siteName?: string;
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
    previewDraft?: boolean;
}

export type BlogPageOpts = PageOpts<BlogFrontMatter>;

export type BlogFrontMatter = {
    author?: string;
    back?: string;
    date?: string;
    description?: string;
    tag?: string | string[];
    title?: string;
    type?: 'post' | 'page' | 'posts' | 'tag' | 'home';
    lang?: 'en' | 'zh';
    draft?: boolean;
    comment?: boolean;
    order?: number; // navbar sorting
    image?: string; // og:image
};

export interface LayoutProps {
    config: NextraBlogThemeConfig;
    opts: BlogPageOpts;
}
