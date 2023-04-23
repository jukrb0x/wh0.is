import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSSG } from 'nextra/ssg';
import type { ReactNode } from 'react';
import { global } from 'styled-jsx/css';

import { BasicLayout } from './basic-layout';
import { useBlogContext } from './blog-context';
import { MDXTheme } from './mdx-theme';
import { collectPostsAndNavs } from './utils/collect';
import { getStaticPosts } from './utils/get-posts';
import getTags from './utils/get-tags';

const NEXTRA_INTERNAL = Symbol.for('__nextra_internal__');

const POSTS_PER_PAGE = 10; // todo: make this configurable in nextra

export const getStaticPaths: GetStaticPaths = () => {
    const posts = getStaticPosts((globalThis as any)[NEXTRA_INTERNAL].pageMap);
    const pages = Math.ceil(posts.length / POSTS_PER_PAGE);
    return {
        paths: Array.from({ length: pages }, (_, i) => ({ params: { page: (i + 1).toString() } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
    return {
        props: {
            ssg: {
                page: params?.page
            }
        }
    };
};

const isSameYear = (date1: Date, date2: Date) =>
    date1 && date2 && date1.getFullYear() === date2.getFullYear();

export const PostsLayout = ({ children }: { children: ReactNode }) => {
    const { config, opts } = useBlogContext();
    let { posts } = collectPostsAndNavs({ config, opts });
    const { type } = opts.frontMatter;
    const router = useRouter();

    const tagName = type === 'tag' ? router.query.tag : null;
    const page: number = router.query.page ? parseInt(router.query.page as string) : 1;

    // pagination indicator
    const isTheFirstPage = page === 1 || page === undefined;
    const isTheLastPage = page === Math.ceil(posts.length / POSTS_PER_PAGE);

    /**
     * slice the posts to show only the ones for the current page
     * currently, tags page doesn't support pagination
     */
    posts = tagName ? posts : posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

    const postList = posts.map((post, id) => {
        // if a tag is specified in the query, only show posts with that tag
        if (tagName) {
            const tags = getTags(post);
            if (!Array.isArray(tagName) && !tags.includes(tagName)) {
                return null;
            }
        } else if (type === 'tag') {
            return null;
        }

        const postTitle = post.frontMatter?.title || post.name;
        const lang = post.frontMatter?.lang || 'en';
        const date = post.frontMatter?.date && new Date(post.frontMatter.date);
        const showYear = id === 0 || !isSameYear(date, new Date(posts[id - 1].frontMatter?.date));
        const description = post.frontMatter?.description;

        return (
            <div key={post.route} className="post-item mb-6 mt-2 no-underline">
                {showYear && (
                    <div className={'relative h20 pointer-events-none'}>
                        <span
                            className={
                                'text-8em op10 absolute left--3rem top--2rem font-bold select-none'
                            }
                        >
                            {date?.getFullYear()}
                        </span>
                    </div>
                )}
                <Link href={post.route} passHref legacyBehavior>
                    <a className={'item'}>
                        <li>
                            <div className={'text-lg leading-1.2rem'}>
                                {lang === 'zh' && (
                                    <span className="text-xs border border-solid border-current rounded px-1 pb-0.2 md:ml--10.5 mr2 align-middle">
                                        中文
                                    </span>
                                )}
                                <span className="no-underline align-middle">{postTitle}</span>
                            </div>
                            {config.showDescription && description && (
                                <p className="text-gray-400">
                                    {description}
                                    {config.readMore && (
                                        <Link href={post.route} passHref legacyBehavior>
                                            <a className="post-item-more ml-2">{config.readMore}</a>
                                        </Link>
                                    )}
                                </p>
                            )}
                            {date && (
                                <div className={'no-underline'}>
                                    <time
                                        className="text-sm opacity-50"
                                        dateTime={date.toISOString()}
                                    >
                                        {date.toDateString()}
                                    </time>
                                </div>
                            )}
                        </li>
                    </a>
                </Link>
            </div>
        );
    });

    return (
        <BasicLayout>
            <MDXTheme>{children}</MDXTheme>
            <ul>{postList}</ul>
            <div className="flex justify-between my-8 not-prose">
                <div>
                    {!tagName && !isTheFirstPage && (
                        <Link href={`/posts/page/${page - 1}`} passHref legacyBehavior>
                            <a className="font-mono op50 hover:op75 transition-all">← Previous</a>
                        </Link>
                    )}
                </div>
                <div>
                    {!tagName && !isTheLastPage && (
                        <Link href={`/posts/page/${page + 1}`} passHref legacyBehavior>
                            <a className="font-mono op50 hover:op75 transition-all">Next →</a>
                        </Link>
                    )}
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-12 border-t border-gray-200"></div>
            </div>
        </BasicLayout>
    );
};
