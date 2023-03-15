import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import styled from 'styled-components';

import { useBlogContext } from './blog-context';
import ThemeSwitch from './theme-switch';
import { collectPostsAndNavs } from './utils/collect';

const StyledNav = styled.nav`
    a {
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        transition: opacity 0.2s ease;
        opacity: 0.6;
        outline: none;
    }

    a:hover {
        opacity: 1;
        text-decoration-color: inherit;
    }
`;

export default function NavBar(): ReactElement {
    const { opts, config } = useBlogContext();
    const { navPages } = collectPostsAndNavs({ opts, config });
    return (
        <div className="flex items-center z-40 py-8 mx-7">
            <div className={'w-[7rem] h-10 absolute lg:fixed m-6 select-none outline-none'}>
                <Image src={'/vercel.svg'} alt={''} fill />
            </div>
            <StyledNav className="flex grow flex-wrap items-center justify-end gap-4">
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
                <ThemeSwitch />
            </StyledNav>
            {config.darkMode && <ThemeSwitch />}
        </div>
    );
}
