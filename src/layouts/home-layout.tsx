import type { ReactNode } from 'react';

import { BasicLayout } from './basic-layout';
import { MDXTheme } from './mdx-theme';

export const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <BasicLayout>
            <MDXTheme>{children}</MDXTheme>
        </BasicLayout>
    );
};
