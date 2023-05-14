import NextImage, { StaticImageData } from 'next/image';
import { ComponentProps, ReactElement, useState } from 'react';
import { ContainerRect, Lightbox, Slide } from 'yet-another-react-lightbox';
import { isImageFitCover, isImageSlide, useLightboxProps } from 'yet-another-react-lightbox/core';

import { EXTERNAL_URL_REGEX } from '@/layouts/constants';

const enableLightbox = true;

// TODO: Zoom Plugin for Next Image
// @see  https://yet-another-react-lightbox.com/examples/nextjs
function nextImageUrl(src: string, size: number) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
}

const NextImageSlideRenderer = ({ slide, rect }: { slide: Slide; rect: ContainerRect }) => {
    const { imageFit } = useLightboxProps().carousel;
    const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

    const scale = 1 || Math.min(rect.width / slide.width!, rect.height / slide.height!);
    const width = !cover
        ? Math.round(Math.min(rect.width, (rect.height / slide.height!) * slide.width!)) * scale
        : rect.width;

    const height = !cover
        ? Math.round(Math.min(rect.height, (rect.width / slide.width!) * slide.height!)) * scale
        : rect.height;

    const placeholder = EXTERNAL_URL_REGEX.test(slide.src) ? 'empty' : 'blur';
    return (
        <div style={{ position: 'relative', width, height }}>
            <NextImage
                fill
                alt={slide.alt ?? ''}
                src={slide as StaticImageData}
                loading="eager" // immediate loading the image when lightbox is opened
                placeholder={placeholder}
                draggable={false}
                style={{ objectFit: cover ? 'cover' : 'contain' }}
                sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
            />
        </div>
    );
};

const ImageLightBox = ({
    src,
    open,
    onOpen,
    onClose
}: {
    src: StaticImageData;
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}) => {
    const hide = () => null;

    return (
        <>
            <Lightbox
                open={open}
                slides={[src]}
                render={{ slide: NextImageSlideRenderer, buttonPrev: hide, buttonNext: hide }}
                carousel={{ imageFit: 'contain', finite: true }}
                close={() => {
                    onClose();
                }}
                controller={{ closeOnBackdropClick: true }}
            />
        </>
    );
};

/**
 * This custom MDX component takes a feature patch for nextra `staticImage` to support next/image.
 * The function receives the same props as the `next/image` component.
 *
 * @see https://github.com/shuding/nextra/issues/1821
 * @see https://nextjs.org/docs/api-reference/next/image
 */
export const Image = ({
    src,
    alt,

    ...props
}: ComponentProps<typeof NextImage>): ReactElement => {
    const [open, setOpen] = useState(false);
    let { height, width } = props;
    console.log('original src', src);

    if (EXTERNAL_URL_REGEX.test(decodeURI(src as string))) {
        console.log('external url', src);
        // calculate next image height and width based on the original image size
        // construct a new static image object for lightbox
        src = {
            src: src as string,
            height: height || 100,
            width: width || 100
        } as StaticImageData;
    }

    return (
        <>
            {enableLightbox && (
                <ImageLightBox
                    src={src as StaticImageData}
                    open={open}
                    onOpen={() => {}}
                    onClose={() => setOpen(false)}
                />
            )}
            <NextImage
                className={enableLightbox ? 'cursor-pointer' : ''}
                src={src}
                alt={alt as string}
                height={height || 100}
                width={width || 100}
                onClick={() => {
                    if (!enableLightbox) return;
                    setOpen(true);
                }}
                {...props}
            />
            <span className={'sr-only'}>Image</span>
            <span className="text-center text-gray-5 text-sm pt-2 block">{alt}</span>
        </>
    );
};
