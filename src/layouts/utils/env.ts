import { useBlogContext } from '@/layouts/blog-context';

export const isDev = process.env.NODE_ENV === 'development';

/**
 * Return true if previewDraft is true in theme.config
 * this should work only in development mode, always return false otherwise
 */
export const ShouldPreviewDraft = () => {
    const { config } = useBlogContext();
    const temp = config.previewDraft || false;
    return isDev && temp;
};
