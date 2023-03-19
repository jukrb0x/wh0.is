import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useMounted } from 'nextra/hooks';

import { MoonIcon, SunIcon } from './icons';

export default function ThemeSwitch({ cursor = false }: { cursor?: boolean }) {
    const { setTheme, resolvedTheme } = useTheme();
    const mounted = useMounted();
    const isDark = resolvedTheme === 'dark';

    // @TODO: system theme
    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <span
            role="button"
            aria-label="Toggle Dark Mode"
            className={clsx('p-2 text-current', cursor ? 'cursor-pointer' : 'cursor-default')}
            tabIndex={0}
            onClick={toggleTheme}
            onKeyDown={(e) => {
                if (e.key === 'Enter') toggleTheme();
            }}
        >
            {mounted && isDark ? <MoonIcon size={16} /> : <SunIcon size={16} />}
        </span>
    );
}
