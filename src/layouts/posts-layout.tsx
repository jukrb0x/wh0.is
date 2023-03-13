import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import { BasicLayout } from './basic-layout';
import { useBlogContext } from './blog-context';
import { MDXTheme } from './mdx-theme';
import Nav from './nav';
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
                <h3>
                    <Link href={post.route} passHref legacyBehavior>
                        <a className="!nx-no-underline">{postTitle}</a>
                    </Link>
                </h3>
                {description && (
                    <p className="nx-mb-2 nx-text-gray-400">
                        {description}
                        {config.readMore && (
                            <Link href={post.route} passHref legacyBehavior>
                                <a className="post-item-more nx-ml-2">{config.readMore}</a>
                            </Link>
                        )}
                    </p>
                )}
                {date && (
                    <time className="nx-text-sm nx-text-gray-300" dateTime={date.toISOString()}>
                        {date.toDateString()}
                    </time>
                )}
            </div>
        );
    });
    return (
        <BasicLayout>
            <Nav />
            <MDXTheme>{children}</MDXTheme>
            {postList}
        </BasicLayout>
    );
};
