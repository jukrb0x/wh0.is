import Link from 'next/link';

export const Back = ({ href }: { href: string }) => (
    <div className={'prose m-auto mt-8 mb-8'}>
        <span className={'font-mono op50'}>{'> '}</span>
        <Link href={href} passHref legacyBehavior>
            <a className={'font-mono op50 hover:op75'}>cd ..</a>
        </Link>
    </div>
);
