import type { MdxFile, PageMapItem } from 'nextra';

import type { LayoutProps } from '../types';
import { sortDate } from './date';
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
 */
export const collectPostsAndNavs = ({ opts }: LayoutProps, includeDraft = true) => {
    const posts: MdxFile[] = [];
    const navPages: (MdxFile & { active: boolean })[] = [];
    const { route } = opts;
    traverse(opts.pageMap, (page) => {
        if (isNav(page)) {
            // WIP
            navPages.push({ ...page, active: page.route === route });
        }
        if (isPost(page)) {
            posts.push(page);
        }
    });
    posts.sort(sortDate);
    navPages.sort(sortDate);
    return { posts, navPages };
};
