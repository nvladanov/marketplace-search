"use client";

import { FC, useState } from "react";
import { Search } from "@/components/ui/Search";

export const HomeSearch: FC = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Search
      value={searchValue}
      onChange={setSearchValue}
      placeholder="Search services"
    />
  );
};
