import path from 'path';

import type { NextraBlogThemeConfig } from './types';

export const DEFAULT_THEME: NextraBlogThemeConfig = {
    footer: (
        <small className="mt-32 block">CC BY-NC 4.0 {new Date().getFullYear()} © Jabriel</small>
    ),
    readMore: 'Read More →'
};
