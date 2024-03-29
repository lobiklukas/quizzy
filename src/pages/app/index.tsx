import { useAutoAnimate } from "@formkit/auto-animate/react";
import { type NextPage } from "next";
import Head from "next/head";
import { MainNavBar } from "../../components/MainNavBar";
import Modal from "../../components/Modal";
import Sidebar from "../../components/Sidebar";
import { useTabStore } from "../../store/tabStore";
import { RedirectToSignIn, SignedOut } from "@clerk/nextjs";

const Home: NextPage = () => {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  const { content } = useTabStore((state) => state.activeTab);

  return (
    <>
      <Head>
        <title>Quizzy</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignedOut>
            <RedirectToSignIn />
      </SignedOut>
      <Sidebar>
        <main ref={animationParent} className="container mx-auto flex flex-col gap-2">
          <MainNavBar />
          {content}
        </main>
      </Sidebar>
      <Modal />
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Home;
