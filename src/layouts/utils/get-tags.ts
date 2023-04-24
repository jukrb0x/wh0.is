import type { MdxFile, PageMapItem } from 'nextra';

import type { BlogFrontMatter } from '../types';
import { flattenPageMap, flattenPageMaps } from './flatten';

export function split(tags: string | string[] = ''): string[] {
    return (Array.isArray(tags) ? tags : tags.split(',')).map((s) => s.trim());
}

interface Page extends MdxFile {
    children?: Page[];
}

export const getStaticTags = (pageMap: PageMapItem[]) => {
    const result: MdxFile[] = [];
    flattenPageMaps(pageMap as Page[], result);
    return Array.from(new Set(result.map(getTags).flat(1).filter(Boolean)));
};

export default function getTags(page: MdxFile<BlogFrontMatter>) {
    // remove non-post pages and drafts
    if (!page.frontMatter || page.frontMatter.draft) {
        return [];
    }
    return split(page.frontMatter.tag);
}
