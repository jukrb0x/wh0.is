import path from 'path';

import Comments from './cusdis';
import type { NextraBlogThemeConfig } from './types';

export const DEFAULT_THEME_CONFIG: NextraBlogThemeConfig = {
    comments: <Comments />,
    footer: (
        <small className="mt-32 block">CC BY-NC 4.0 {new Date().getFullYear()} © Jabriel</small>
    ),
    readMore: 'Read More →',
    showDescription: false,
    previewDraft: true
};

export const EXTERNAL_URL_REGEX = /^https?:\/\//;
