import clsx from 'clsx';
import type { ComponentProps } from 'react';

export const Table = ({ className = '', ...props }: ComponentProps<'table'>) => (
    <table className={'overflow-x-scroll ' + className} {...props} />
);
