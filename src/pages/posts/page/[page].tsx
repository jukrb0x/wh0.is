import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export const getStaticPaths = async () => {
    // fake data
    const paths = [];
    for (let i = 1; i <= 10; i++) {
        paths.push({ params: { page: i.toString() } });
    }
    return {
        paths,
        fallback: false
    };
};
export const getStaticProps = async (context) => {
    const { page } = context.params;
    return {
        props: {
            page
        }
    };
};

export default function Page({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            <h1>Page {page}</h1>
        </div>
    );
}
