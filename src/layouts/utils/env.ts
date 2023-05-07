import config from '#ROOT/theme.config';

export const isDev = process.env.NODE_ENV === 'development';

export const previewDraft = isDev && config.previewDraft;
