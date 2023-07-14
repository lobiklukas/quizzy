

import type { GetStaticProps } from 'next';
import PostContent from '../../components/Blog/PostContent';
import { getPostData, getPostsFiles } from '../../utils/blog-helpers';

function SinglePost({ data } : {data: ReturnType<typeof getPostData>}) {
    return (
        <>
            <PostContent postData={data} />
        </>
    )
}

export const getStaticProps: GetStaticProps = (context) => {
    const { params } = context;
    const slug = params?.slug ?? "";
    const postData = getPostData(slug as string);
    return {
        props: {
            data: postData
        },
    }
}
export const getStaticPaths = () => {
    const postsFileNames = getPostsFiles()
    const postsSlugs = postsFileNames.map((fileName) => fileName.replace(/\.md$/, ''))
    return {
        paths: postsSlugs.map((slug) => ({ params: { slug } })),
        fallback: false
    }
}

export default SinglePost