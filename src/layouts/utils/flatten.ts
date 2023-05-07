import { MdxFile, PageMapItem } from 'nextra';

interface Page extends MdxFile {
    children?: Page[];
}

export const flattenPageMap = (page: Page, result: PageMapItem[] = []) => {
    if (Array.isArray(page.children!)) {
        page.children.forEach((p) => flattenPageMap(p, result));
    }
    result.push(page);
};

export const flattenPageMaps = (pages: Page[], result: PageMapItem[] = []) => {
    pages.forEach((v) => flattenPageMap(v, result));
};
