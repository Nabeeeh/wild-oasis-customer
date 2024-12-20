import Link from "next/link";
import Image from "next/image";

import bgImg from "@/public/bg.png";

const Home = () => {
  return (
    <main className="mt-24">
      <Image
        src={bgImg}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
        placeholder="blur"
        fill
        priority
        sizes="100vw"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 text-base px-4 py-4  text-primary-800 md:px-8 md:py-6 md:text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
};

export default Home;
