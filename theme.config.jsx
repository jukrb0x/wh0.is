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
export default {
    footer: <Footer />,
    head: ({ title, meta }) => {
        return (
            <>
                {meta.description && <meta name="description" content={meta.description} />}
                {meta.tag && <meta name="keywords" content={meta.tag} />}
                {meta.author && <meta name="author" content={meta.author} />}
            </>
        );
    },
    readMore: /*'Read More →'*/ false,
    postFooter: null,
    darkMode: false,
    navs: [
        // {
        //     url: '/friends',
        //     name: 'Friends'
        // }
    ],
    showDescription: false
};
