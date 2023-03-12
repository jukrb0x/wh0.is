import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <Head>
                <title>messing around</title>
            </Head>
            <main>
                Hi, welcome home.
                <br />
                <Link href={'/blog'}>blog</Link>
            </main>
        </>
    );
}
