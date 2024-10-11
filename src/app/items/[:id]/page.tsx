import { FC } from "react";
import Link from "next/link";

import { getItem } from "@/api/search";

interface IServicePageContext {
  params: {
    ":id": string;
  };
}

const ServicePage: FC<IServicePageContext> = async (
  context: IServicePageContext
) => {
  const { data } = await getItem(context.params[":id"]);

  return (
    <div className="relactive grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col flex-1 row-start-2 w-full max-w-[660px] px-4">
        <h1 className="text-4xl font-medium">{data.label}</h1>
        <div className="text-xl mt-6">{data.description}</div>

        {data.contributors.length > 0 && (
          <>
            <h2 className="text-xl font-medium mt-6">Contributors</h2>
            <div className="text-lg mt-1">
              {data.contributors
                .map((contributer) => contributer.actor.name)
                .join(", ")}
            </div>
          </>
        )}
        {data.contributors.length > 0 && (
          <>
            <h2 className="text-xl font-medium mt-6">Resources</h2>
            <div className="flex flex-col gap-0.5 text-lg mt-1">
              {(data.accessibleAt || []).map((link, index) => (
                <Link
                  key={index}
                  href={link}
                  className="text-link"
                  target="_blank"
                >
                  {link}
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ServicePage;
