import { NextraBlogThemeConfig } from '@/layouts/types';

const year = new Date().getFullYear();

const Footer = () => (
    <div className="mt-10 pb-10 prose dark:prose-invert m-auto opacity-50 flex justify-between">
        <span className="text-sm">
            <span className={'i-ooui-logo-cc'} />{' '}
            <a
                target="_blank"
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                style={{ color: 'inherit' }}
            >
                CC BY-NC-SA 4.0
            </a>
        </span>
        <span className={'text-sm'}>2017 - {year} © Jabriel</span>
    </div>
);

const config: NextraBlogThemeConfig = {
    siteName: 'Jabriel | wh0.is',
    cusdis: {
        appId: '4cb397f1-774c-4249-932e-60b11baf7f7d',
        host: 'https://c.wh0.is',
        lang: 'en'
    },
    footer: <Footer />,
    head: ({ title, meta }) => {
        // Open Graph see @/layout/basic-layout.tsx
        return (
            <>
                {meta.description && <meta name="description" content={meta.description} />}
                {meta.tag && <meta name="keywords" content={meta.tag} />}
                {meta.author && <meta name="author" content={meta.author} />}
            </>
        );
    },
    readMore: '',
    postFooter: undefined,
    darkMode: false,
    navs: [
        // {
        //     url: '/friends',
        //     name: 'Friends'
        // }
    ],
    showDescription: false,
    previewDraft: true
};

export default config;
