// use for pagination
import { MdxFile, PageMapItem } from 'nextra';

import { flattenPageMap, flattenPageMaps } from './flatten';

const NEXTRA_INTERNAL = Symbol.for('__nextra_internal__');

interface Page extends MdxFile {
    children?: Page[];
}

const isPost = (page: PageMapItem): page is MdxFile => {
    if (
        page.kind === 'Folder' ||
        page.kind === 'Meta' ||
        page.name.startsWith('_') ||
        page.frontMatter?.draft === true
    )
        return false;
    const type = page.frontMatter?.type;
    return !type || type === 'post';
};

export const getStaticPosts = (pageMap: PageMapItem[]) => {
    const result: MdxFile[] = [];
    flattenPageMaps(pageMap as Page[], result);
    return result.filter(isPost);
};
