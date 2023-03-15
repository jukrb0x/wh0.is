import Link from 'next/link';
import type { ReactElement } from 'react';

import { useBlogContext } from './blog-context';
import ThemeSwitch from './theme-switch';
import { collectPostsAndNavs } from './utils/collect';

export default function Nav(): ReactElement {
    const { opts, config } = useBlogContext();
    const { navPages } = collectPostsAndNavs({ opts, config });
    return (
        <div className="flex items-center gap-3 z-40 py-8">
            <div>LOGO</div>
            <div className="flex grow flex-wrap items-center justify-end gap-3">
                {navPages.map((page) => {
                    if (page.active) {
                        return (
                            <span key={page.route} className="cursor-default text-gray-400">
                                {page.frontMatter?.title || page.name}
                            </span>
                        );
                    }
                    return (
                        <Link key={page.route} href={page.route} passHref legacyBehavior>
                            <a>{page.frontMatter?.title || page.name}</a>
                        </Link>
                    );
                })}
                {config.navs?.map((nav) => (
                    <Link key={nav.url} href={nav.url} passHref legacyBehavior>
                        <a>{nav.name}</a>
                    </Link>
                ))}
            </div>
            {config.darkMode && <ThemeSwitch />}
        </div>
    );
}
