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

function isExternalUrl(url: string) {
    return EXTERNAL_URL_REGEX.test(url);
}

const NextImageSlideRenderer = ({ slide, rect }: { slide: Slide; rect: ContainerRect }) => {
    const { imageFit } = useLightboxProps().carousel;
    const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

    /**
     *  Lightbox Image Size Calculation
     *  1. if the image size is larger than the container, then use the container size
     *  2. if the image size is smaller than the container, then use the image size
     *  3. make sure the image not exceeds the container
     */
    const width = !cover
        ? Math.round(
              Math.min(
                  rect.width,
                  Math.min(slide.width!, (rect.height / slide.height!) * slide.width!)
              )
          )
        : rect.width;

    const height = !cover
        ? Math.round(
              Math.min(
                  rect.height,
                  Math.min(slide.height!, (rect.width / slide.width!) * slide.height!)
              )
          )
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
    const { src: srcUrl } = src;
    const isExternal = isExternalUrl(srcUrl);
    const slides = isExternal
        ? [
              {
                  src: src.src
              }
          ]
        : [src];

    return (
        <>
            <Lightbox
                open={open}
                slides={slides}
                render={{
                    slide: !isExternal ? NextImageSlideRenderer : undefined,
                    buttonPrev: hide,
                    buttonNext: hide
                }}
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
 * @TODO find a way to calculate the image height/width and pass to the `next/image` component for remote images
 *       so we can use the `next/image` component for both local and remote images.
 *
 * @see https://github.com/shuding/nextra/issues/1821
 * @see https://nextjs.org/docs/api-reference/next/image
 */
export const Image = ({
    src,
    alt,
    height,
    width,
    ...props
}: ComponentProps<typeof NextImage>): ReactElement => {
    const [open, setOpen] = useState(false);
    const isExternal = isExternalUrl(decodeURI(src as string));

    // construct new StaticImageData object for lightbox from a remote image
    let imageData: StaticImageData = !isExternal
        ? (src as StaticImageData)
        : ({
              src: src as string
          } as StaticImageData);

    return (
        <>
            {enableLightbox && (
                <ImageLightBox
                    src={imageData}
                    open={open}
                    onOpen={() => {}}
                    onClose={() => setOpen(false)}
                />
            )}

            {/* use next/image if the image is served internally */}
            {isExternal ? (
                <img
                    className={enableLightbox ? 'cursor-pointer' : ''}
                    src={imageData.src}
                    alt={alt as string}
                    onClick={() => {
                        if (!enableLightbox) return;
                        setOpen(true);
                    }}
                />
            ) : (
                <NextImage
                    className={enableLightbox ? 'cursor-pointer' : ''}
                    src={imageData}
                    alt={alt as string}
                    height={height}
                    width={width}
                    onClick={() => {
                        if (!enableLightbox) return;
                        setOpen(true);
                    }}
                    {...props}
                />
            )}

            {/* image caption */}
            <span className={'sr-only'}>Image</span>
            <span className="text-center text-gray-5 text-sm pt-2 block">{alt}</span>
        </>
    );
};
