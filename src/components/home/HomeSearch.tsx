"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";

import { Search } from "@/components/ui/Search";

export const HomeSearch: FC = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const onSearch = (searchStr: string) => {
    router.push(`/search?query=${searchStr}`);
  };

  return (
    <Search
      value={searchValue}
      onChange={setSearchValue}
      placeholder="Search services"
      onSearch={onSearch}
    />
  );
};
