import type { GetStaticPaths } from "next";
import NavBar from "../../components/LandingPage/NavBar";
import { useTheme } from "../../hooks/useTheme";
import fs from "fs";
import type { Post } from "../../utils/blog-helpers";
import generateRSSFeed, {
  getAllPosts,
  getLatestPosts,
} from "../../utils/blog-helpers";
import PostCard from "../../components/Blog/PostCard";

interface IBlogPOst {
  posts: Post[];
}

export default function Blog({ posts }: IBlogPOst) {
  const { theme, setTheme } = useTheme();

  return (
    <main>
      <NavBar theme={theme} setTheme={setTheme} />
      <div className="pt-32 container mx-auto">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}

export const getStaticProps = () => {
  const data = getLatestPosts();
  const allPost = getAllPosts();
  const feed = generateRSSFeed(allPost);
  // Write the RSS output to a public file, making it
  // accessible at https://markdown-blog-ten-beta.vercel.app/rss.xml
  fs.writeFileSync("public/rss.xml", feed.rss2());

  return {
    props: {
      posts: data,
    },
  };
};