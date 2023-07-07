

import PostContent from '../../components/Blog/PostContent';
import { getPostData, getPostsFiles } from '../../utils/blog-helpers';

function SinglePost({ data } : {data: any}) {
    return (
        <>
            <PostContent postData={data} />
        </>
    )
}

export const getStaticProps = (context: any) => {
    const { params } = context;
    const { slug } = params
    const postData = getPostData(slug);
    return {
        props: {
            data: postData
        },
        revalidate: 600,
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