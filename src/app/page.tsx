import { FC } from "react";

import { HomeFooter } from "@/components/home/HomeFooter";
import { HomeSearch } from "@/components/home/HomeSearch";

const Home: FC = () => {
  return (
    <div className="relactive grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center w-full max-w-[660px] absolute top-[40%] px-4">
        <HomeSearch />
      </main>
      <HomeFooter />
    </div>
  );
};

export default Home;
