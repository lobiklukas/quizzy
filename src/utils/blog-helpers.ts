import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Feed } from "feed";

const postsDirectory = path.join(process.cwd(), "blog-content");

export type Post = {
  slug?: string;
  image: string;
  date: number;
  content: string;
  topic: string;
  excerpt: string;
  title: string;
  readTime: string;
  updatedDate: string;
};

type MatterPost = { data: Post; content: string };

export const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
};

export function getPostData(postIdentifier: string) {
  //extract slug from file name
  const postSlug = postIdentifier.replace(/\.md$/, "");

  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent) as unknown as MatterPost;

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getPostByTopic(topic: string) {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const filteredPosts = allPosts.filter((post) => post.topic === topic);

  return filteredPosts;
}

export function getLatestPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const dateOfToday = new Date();
  const twoMonthsAgo = new Date(dateOfToday.getMonth() - 2);

  const latestPost = allPosts.filter((post) => {
    const postDate = new Date(post.date);
    if (postDate >= twoMonthsAgo) {
      return true;
    }
  });

  const sortedPosts = latestPost.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

const generateRSSFeed = (articles: Post[]) => {
  const baseUrl = "https://markdown-blog-ten-beta.vercel.app/";
  const author = {
    name: "Teyim Asobo",
    email: "teyimasobo@gmail.com",
    link: "https://twitter.com/asofex",
  };

  // Construct a new Feed object
  const feed = new Feed({
    title: "Articles by Teyim Asobo",
    description:
      "U can find me on all platforms like twitter,github and linkedIn.pretty nerdy? ,yes i know. I am also on facebook and instagram too, not sharing hot pics though..i have a passion for frontend development",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
    copyright: "",
  });

  // Add each article to the feed
  articles.forEach((post) => {
    const { content, slug, date, title } = post;
    const url = `${baseUrl}/${slug}`;

    feed.addItem({
      title,
      id: url,
      link: url,
      content,
      author: [author],
      date: new Date(date),
    });
  });

  return feed;
};
export default generateRSSFeed;
