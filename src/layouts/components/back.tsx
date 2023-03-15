import Link from 'next/link';

export default function Back({ href }: { href: string }) {
    return (
        <div className={'prose m-auto mt-8 mb-8'}>
            <span className={'font-mono op50'}>{'> '}</span>
            <Link href={href} passHref legacyBehavior>
                <a className={'font-mono op50 hover:op75'}>cd ..</a>
            </Link>
        </div>
    );
}
