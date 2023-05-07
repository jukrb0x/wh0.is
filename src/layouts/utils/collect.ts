import type { MdxFile, PageMapItem } from 'nextra';

import type { LayoutProps } from '../types';
import { sortDate } from './date';
import { ShouldPreviewDraft } from './env';
import traverse from './traverse';

const isNav = (page: PageMapItem): page is MdxFile => {
    const type = 'frontMatter' in page && page.frontMatter?.type;
    return type && ['page', 'posts'].includes(type);
};
const isPost = (page: PageMapItem): page is MdxFile => {
    if (page.kind === 'Folder' || page.kind === 'Meta' || page.name.startsWith('_')) return false;
    const type = page.frontMatter?.type;
    return !type || type === 'post';
};

/**
 * Collects all posts and nav pages from the page map
 * Sorted by date
 * @param opts
 * @param includeDraft
 */
export const collectPostsAndNavs = ({ opts }: LayoutProps, includeDraft = false) => {
    const posts: MdxFile[] = [];
    const navPages: (MdxFile & { active: boolean })[] = [];
    const { route } = opts;
    traverse(opts.pageMap, (page) => {
        // include draft posts if previewDraft is true
        if (ShouldPreviewDraft()) includeDraft = true;
        // include non-draft posts
        const isInclusive = includeDraft || !(page as MdxFile).frontMatter?.draft;

        if (isNav(page) && isInclusive) {
            navPages.push({ ...page, active: page.route === route });
        }
        if (isPost(page) && isInclusive) {
            posts.push(page);
        }
    });

    posts.sort(sortDate);
    navPages.sort(sortDate);
    return { posts, navPages };
};
