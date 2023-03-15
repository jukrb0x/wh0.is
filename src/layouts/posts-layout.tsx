import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import { BasicLayout } from './basic-layout';
import { useBlogContext } from './blog-context';
import { MDXTheme } from './mdx-theme';
import { collectPostsAndNavs } from './utils/collect';
import getTags from './utils/get-tags';

export const PostsLayout = ({ children }: { children: ReactNode }) => {
    const { config, opts } = useBlogContext();
    const { posts } = collectPostsAndNavs({ config, opts });
    const router = useRouter();
    const { type } = opts.frontMatter;
    const tagName = type === 'tag' ? router.query.tag : null;
    const postList = posts.map((post) => {
        if (tagName) {
            const tags = getTags(post);
            if (!Array.isArray(tagName) && !tags.includes(tagName)) {
                return null;
            }
        } else if (type === 'tag') {
            return null;
        }

        const postTitle = post.frontMatter?.title || post.name;
        const date = post.frontMatter?.date && new Date(post.frontMatter.date);
        const description = post.frontMatter?.description;

        return (
            <div key={post.route} className="post-item">
                <Link href={post.route} passHref legacyBehavior>
                    <li>
                        <span>
                            <a className="!no-underline">{postTitle}</a>
                        </span>
                        {config.showDescription && description && (
                            <p className="mb-2 text-gray-400">
                                {description}
                                {config.readMore && (
                                    <Link href={post.route} passHref legacyBehavior>
                                        <a className="post-item-more ml-2">{config.readMore}</a>
                                    </Link>
                                )}
                            </p>
                        )}
                        {date && (
                            <time className="text-sm text-gray-300" dateTime={date.toISOString()}>
                                {date.toDateString()}
                            </time>
                        )}
                    </li>
                </Link>
            </div>
        );
    });
    return (
        <BasicLayout>
            <MDXTheme>{children}</MDXTheme>
            <ul>{postList}</ul>
        </BasicLayout>
    );
};
