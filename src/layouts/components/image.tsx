import NextImage, { StaticImageData } from 'next/image';
import { ComponentProps, ReactElement, useState } from 'react';
import { ContainerRect, Lightbox, Slide } from 'yet-another-react-lightbox';
import { isImageFitCover, isImageSlide, useLightboxProps } from 'yet-another-react-lightbox/core';

const LightBoxNextImageRenderer = ({ slide, rect }: { slide: Slide; rect: ContainerRect }) => {
    const { imageFit } = useLightboxProps().carousel;
    const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

    const imgSrc: StaticImageData = slide.src as never;

    const width = !cover
        ? Math.round(Math.min(rect.width, (rect.height / imgSrc.height) * imgSrc.width!))
        : rect.width;

    const height = !cover
        ? Math.round(Math.min(rect.height, (rect.width / imgSrc.width) * imgSrc.height))
        : rect.height;

    return (
        <div style={{ position: 'relative', width, height }}>
            <NextImage
                fill
                alt={''}
                src={slide.src}
                // height={ imgSrc.height }
                // width={ imgSrc.width }
                loading="eager"
                placeholder="blur"
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
    src: string;
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}) => {
    const hide = () => null;

    return (
        <>
            <Lightbox
                open={open}
                slides={[{ src: src }]}
                render={{ slide: LightBoxNextImageRenderer, buttonPrev: hide, buttonNext: hide }}
                carousel={{ imageFit: 'contain', finite: true }}
                close={() => {
                    onClose();
                }}
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
    height,
    width,
    ...props
}: ComponentProps<typeof NextImage>): ReactElement => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <ImageLightBox
                src={src as string}
                open={open}
                onOpen={() => {}}
                onClose={() => setOpen(false)}
            />
            <NextImage
                src={src}
                alt={alt as string}
                height={height}
                width={width}
                onClick={() => {
                    console.log('click');
                    setOpen(true);
                }}
            />
            <span className={'sr-only'}>Image</span>
            <span className="text-center text-gray-5 text-sm pt-2 block">{alt}</span>
        </>
    );
};
