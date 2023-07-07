import Image from "next/image";
import Link from "next/link";
import type { Post } from "../../utils/blog-helpers";

interface IPostProps {
  post: Post;
}

function PostCard({ post }: IPostProps) {
  const { title, image, excerpt, date, slug, readTime, topic } = post;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const linkPath = `/blog/${slug}`;

  return (
    <Link className="card" href={linkPath}>
      <div className="card-body mx-auto my-2 overflow-hidden rounded-lg p-6 shadow-xl hover:cursor-pointer hover:bg-neutral-focus/20 hover:shadow-sm md:flex md:w-[600px]">
        <div className="text-center md:text-left">
          <Image
            src={image + "?random=" + Math.random()}
            className="rounded-xl shadow-md"
            width="700"
            height="400"
            alt="post image"
          />
          <div className="pt-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            <h3 className="my-2 text-lg text-gray-600">{excerpt}</h3>
            <div />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-center text-lg font-semibold">
              {formattedDate}
            </h3>
            <div className="my-4 flex items-center justify-evenly gap-2 font-medium">
              <div className="badge-neutral badge p-4">{topic}</div>
              <h3>{readTime} read</h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
