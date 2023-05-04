import { existsSync } from 'fs';
import NextImage from 'next/image';
import Link from 'next/link';
import { MDXProvider } from 'nextra/mdx';
import type { Components } from 'nextra/mdx';
import path from 'path';
import type { ComponentProps, ReactElement, ReactNode, RefObject } from 'react';
import { createContext, createRef, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import slash from 'slash';

import { EXTERNAL_URL_REGEX, PUBLIC_DIR } from '@/layouts/constants';

import { useBlogContext } from './blog-context';
import { Code, Pre, Table, Td, Th, Tr } from './components';

export const HeadingContext = createContext<RefObject<HTMLHeadingElement | null>>(createRef());

const H1 = ({ children }: { children?: ReactNode }): ReactElement => {
    const ref = useContext(HeadingContext);
    const { opts } = useBlogContext();
    const [showHeading, setShowHeading] = useState(false);
    useEffect(() => {
        if (ref.current && opts.hasJsxInH1) {
            setShowHeading(true);
        }
    }, [opts.hasJsxInH1, ref]);
    return <>{showHeading && createPortal(children, ref.current!)}</>;
};

function HeadingLink({
    tag: Tag,
    children,
    id,
    ...props
}: ComponentProps<'h2'> & { tag: `h${2 | 3 | 4 | 5 | 6}` }): ReactElement {
    return (
        <Tag className={`subheading-${Tag}`} {...props}>
            {children}
            <span className="absolute -mt-7" id={id} />
            <a
                href={id && `#${id}`}
                className="header-anchor"
                aria-label="Permalink for this section"
            >
                #
            </a>
        </Tag>
    );
}

const A = ({ children, ...props }: ComponentProps<'a'>) => {
    const isExternal = props.href?.startsWith('https://') || props.href?.startsWith('http://');
    if (isExternal) {
        return (
            <>
                <a target="_blank" rel="noreferrer" {...props}>
                    {children}
                    <span className="sr-only"> (open in a new tab) </span>
                </a>
                <sup>
                    <a
                        className="i-ic:round-open-in-new no-underline text-xs text-gray-400 px-1"
                        target={'_blank'}
                        title={'Open in a new tab'}
                        rel={'noreferrer'}
                        {...props}
                    />
                </sup>
            </>
        );
    }
    return props.href ? (
        <Link href={props.href} passHref legacyBehavior>
            <a {...props}>{children}</a>
        </Link>
    ) : null;
};

/**
 * This custom MDX component takes a feature patch for nextra `staticImage` to support next/image.
 * The function receives the same props as the `next/image` component.
 *
 * @see https://github.com/shuding/nextra/issues/1821
 * @see https://nextjs.org/docs/api-reference/next/image
 */
const Image = ({
    src,
    alt,
    height,
    width,
    ...props
}: ComponentProps<typeof NextImage>): ReactElement => {
    return (
        <>
            <NextImage src={src} alt={alt as string} height={height} width={width} />
            <span className={'sr-only'}>Image</span>
            <span className="text-center text-gray-5 text-sm pt-2 block">{alt}</span>
        </>
    );
};

// TODO: rewrite all these components
const useComponents = (): Components => {
    const { config } = useBlogContext();
    return {
        h1: H1,
        h2: (props) => <HeadingLink tag="h2" {...props} />,
        h3: (props) => <HeadingLink tag="h3" {...props} />,
        h4: (props) => <HeadingLink tag="h4" {...props} />,
        h5: (props) => <HeadingLink tag="h5" {...props} />,
        h6: (props) => <HeadingLink tag="h6" {...props} />,
        a: A,
        pre: ({ children, ...props }) => (
            // FIXME
            <div className="not-prose">
                <Pre {...props}>{children}</Pre>
            </div>
        ),
        tr: Tr,
        th: Th,
        td: Td,
        // FIXME
        table: (props) => <Table className="removed-not-prose" {...props} />,
        code: Code,
        // todo: img lightbox
        img: Image as never,
        ...config.components
    };
};

export const MDXTheme = ({ children }: { children: ReactNode }): ReactElement => {
    return <MDXProvider components={useComponents()}>{children}</MDXProvider>;
};
