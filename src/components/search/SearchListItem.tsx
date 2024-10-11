import { FC } from "react";

import Link from "next/link";

import { ISearchItem } from "@/interfaces/search";

const MAX_DESCRIPTION_LENGTH = 200;

interface IProps {
  item: ISearchItem;
}

export const SearchListItem: FC<IProps> = ({ item }) => (
  <div key={item.persistentId} className="bg-secondary rounded-xl py-3 px-5">
    <div className="text-lg">
      <Link
        href={`/items/${item.persistentId}`}
        className="text-link"
        target="_blank"
      >
        {item.label}
      </Link>
    </div>
    <div className="text-sm mt-1">
      {item.description.slice(0, MAX_DESCRIPTION_LENGTH)}
      {item.description.length > MAX_DESCRIPTION_LENGTH ? "..." : ""}
    </div>
    <div className="text-sm mt-1.5">
      {item.contributors
        .map((contributer) => contributer.actor.name)
        .join(", ")}
    </div>
    <div className="flex flex-col gap-0.5 text-sm mt-1">
      {(item.accessibleAt || []).map((link, index) => (
        <Link
          key={index}
          href={link}
          className="text-link truncate w-full"
          target="_blank"
        >
          {link}
        </Link>
      ))}
    </div>
  </div>
);
