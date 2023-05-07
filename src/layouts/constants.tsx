import path from 'path';

import type { NextraBlogThemeConfig } from './types';

export const DEFAULT_THEME_CONFIG: NextraBlogThemeConfig = {
    footer: (
        <small className="mt-32 block">CC BY-NC 4.0 {new Date().getFullYear()} © Jabriel</small>
    ),
    readMore: 'Read More →',
    showDescription: false,
    previewDraft: true
};
