
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import type { Post } from '../../utils/blog-helpers';

interface IPostContentProps {
    postData: Post;
}

function PostContent({ postData }: IPostContentProps) {

    const { title, image, date, readTime, topic, content} = postData;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const customRenderers = {

        p(paragraph: any) {
            const { node } = paragraph;

            if (node.children[0].tagName === 'img') {
                const image = node.children[0];

                return (
                    <div>
                        <Image
                            src={image +"?random=" + Math.random()}
                            alt={image.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }

            return <p>{paragraph.children}</p>;
        },
        h1: (heading: any) => (<h1 className='text-4xl font-semibold my-3'>{heading.children}</h1>),
        h2: (heading: any) => (<h2 className='text-2xl font-semibold my-3'>{heading.children}</h2>),
        h3: (heading: any) => (<h3 className='text-xl font-semibold my-3'>{heading.children}</h3>),
        h4: (heading: any) => (<h4 className='text-lg font-semibold my-3'>{heading.children}</h4>),
        h5: (heading: any) => (<h5 className='text-base font-semibold my-3'>{heading.children}</h5>),
        h6: (heading: any) => (<h6 className='text-sm font-semibold my-3'>{heading.children}</h6>),
    };

    return (
        <>
        <div className="w-full px-12 py-4">
            <div className='flex my-4'>
                <ChevronLeftIcon className='w-5 h-5 mx-2 my-auto' />
                    <span className="hover:font-semibold"><Link href='/blog' >Back to Posts</Link></span>
            </div>
                <div className='md:w-3/5 my-6 mx-auto'>
                    <Image src={image +"?random=" + Math.random()} width='800' height='400' alt='post image' className='rounded-2xl shadow-md' />
                    <h1 className='text-5xl font-semibold my-3 text-center'>{title}</h1>
                    <h2 className='text-xl font-medium text-center'>{formattedDate}- {readTime} read</h2>
                    <div className='w-full text-center pt-2'>
                    <div className='badge badge-neutral p-4 mx-auto text-center'>{topic}</div>
                    </div>
                    <article className="prose prose-slate prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600 lg:prose-lg my-4">
                        <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
                </article>
            </div>
        </div >
        </>

    )
}

export default PostContent
