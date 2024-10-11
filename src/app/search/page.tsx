"use client";

import { FC, useEffect, useState } from "react";
import Select from "react-select";

import { searchItems } from "@/api/search";
import { ISearchItem } from "@/interfaces/search";
import { Search } from "@/components/ui/Search";
import { SkeletonList } from "@/components/search/SkeletonList";
import { Pagination } from "@/components/search/Pagination";
import { SearchListItem } from "@/components/search/SearchListItem";

interface IPaginationOption {
  value: number;
  label: string;
}

const PAGINATION_OPTIONS: IPaginationOption[] = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
];

interface ISearchPageContext {
  searchParams: { query: string };
}

const SearchPage: FC<ISearchPageContext> = ({ searchParams: { query } }) => {
  const [searchValue, setSearchValue] = useState(query);

  const [items, setItems] = useState<ISearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [perPage, setPerPage] = useState(PAGINATION_OPTIONS[1]);

  const onSearch = async () => {
    setIsLoading(true);

    try {
      const { data } = await searchItems({
        search: searchValue,
        page: page,
        perpage: perPage.value,
      });

      setPages(data.pages);
      setItems(data.items || []);
    } catch {
      // TODO: handle loading error
    } finally {
      setIsLoading(false);
    }
  };

  const onApplySearch = () => {
    setPage(1);
    onSearch();
  };

  const onChangePerPage = (perPage: IPaginationOption) => {
    setPage(1);
    setPerPage(perPage);
  };

  useEffect(() => {
    onSearch();
  }, [page, perPage]);

  return (
    <div className="relactive">
      <main className="px-10 py-4 max-w-[760px]">
        <div className="absolute max-w-[680px] w-full">
          <Search
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search services"
            onSearch={onApplySearch}
          />
        </div>
        {isLoading ? (
          <SkeletonList />
        ) : (
          <div className="flex flex-col gap-3 mt-16">
            {items.map((item) => (
              <SearchListItem key={item.persistentId} item={item} />
            ))}

            {items.length === 0 && (
              <div className="text-lg p-5">No results found</div>
            )}
          </div>
        )}
        <div className="flex gap-4 mt-8 mb-32 justify-between">
          <Pagination
            page={page}
            pages={pages}
            onChangePage={(page) => setPage(page)}
          />
          <div>
            <Select
              value={perPage}
              options={PAGINATION_OPTIONS}
              onChange={(paginationOption) =>
                onChangePerPage(paginationOption || PAGINATION_OPTIONS[1])
              }
              className="pagination__select"
              styles={{
                control: (base) => ({
                  ...base,
                  background: "var(--secondary)",
                  borderColor: "var(--tertiary)",
                  borderRadius: 8,
                }),
                indicatorSeparator: (base) => ({
                  ...base,
                  background: "var(--tertiary)",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "white",
                }),
                option: (base, state) => ({
                  ...base,
                  background: state.isFocused
                    ? "var(--tertiary)"
                    : "var(--secondary)",
                  borderColor: "var(--tertiary)",
                }),
                menuList: (base) => ({
                  ...base,
                  background: "var(--secondary)",
                  borderRadius: 3,
                  overflow: "hidden",
                }),
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
