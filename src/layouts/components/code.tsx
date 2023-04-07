import type { ComponentProps, ReactElement } from 'react';

export const Code = ({
    children,
    className = '',
    ...props
}: ComponentProps<'code'>): ReactElement => {
    const hasLineNumbers = 'data-line-numbers' in props;
    const isCodeBlock = 'data-language' in props || 'data-theme' in props;
    return (
        <code
            className={[
                'border-black border-opacity-[0.04] bg-opacity-[0.03] bg-black break-words rounded-md border py-0.5 px-[.25em] text-[.9em]',
                'dark:border-white/10',
                hasLineNumbers ? '[counter-reset:line]' : '',
                isCodeBlock ? '' : 'dark:bg-white/10',
                className
            ].join(' ')}
            // always show code blocks in ltr
            dir="ltr"
            {...props}
        >
            {children}
        </code>
    );
};
