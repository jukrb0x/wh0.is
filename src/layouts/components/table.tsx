import clsx from 'clsx';
import type { ComponentProps } from 'react';

export const Table = ({ className = '', ...props }: ComponentProps<'table'>) => (
    <div className={'table-wrapper block w-full overflow-x-scroll'}>
        <table className={className} {...props} />
    </div>
);
