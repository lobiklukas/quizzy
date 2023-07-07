import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface IHeroProps {
  theme: string;
}

function Hero({ theme }: IHeroProps) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content mt-12 flex-col gap-12 text-center lg:mt-0 lg:flex-row-reverse lg:justify-around lg:text-left">
        <div>
          <h1 className="text-5xl  font-bold text-secondary">
            Learn hard concepts with ease!
          </h1>
          <p className="py-6">
            Our intuitive interface and powerful study tools make learning fun
            and engaging. Whether you&apos;re preparing for an exam, learning a
            new language, or simply trying to expand your knowledge, our
            flashcards are the perfect tool to help you achieve your goals.
          </p>
          <Link href="/app" className="btn-primary btn">
            Try it yourself <ChevronRightIcon className="ml-2 h-6 w-6" />
          </Link>
        </div>
        <div className="mockup-window max-w-2xl shrink-0 border-2 border-primary bg-base-300 shadow-2xl">
          <div className="flex justify-center bg-base-200 ">
            <Image
              src={`/screenshots/${theme}/dashboard.png`}
              alt="App showcase"
              width={1280}
              height={720}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
