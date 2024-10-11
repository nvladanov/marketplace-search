import { FC } from "react";

interface IProps {
  page: number;
  pages: number;
  onChangePage: (page: number) => void;
}

export const Pagination: FC<IProps> = ({ page, pages, onChangePage }) => {
  const amountPrevPages = Math.min(2, page - 1);
  const amountNextPages = Math.min(2, pages - page);

  return (
    <div className="flex gap-2">
      {amountPrevPages > 0 && (
        <>
          <div
            onClick={() => onChangePage(page - 1)}
            className="flex items-center justify-center text-lg h-10 px-5 font-medium rounded-lg hover:bg-secondary transition cursor-pointer"
          >
            previous
          </div>
          {new Array(amountPrevPages).fill(null).map((_, index) => (
            <div
              key={index}
              onClick={() =>
                onChangePage(page - (Math.min(2, amountPrevPages) - index))
              }
              className="flex items-center justify-center text-lg w-10 h-10 font-medium rounded-full cursor-pointer hover:bg-secondary transition"
            >
              {page - (Math.min(2, amountPrevPages) - index)}
            </div>
          ))}
        </>
      )}
      <div className="flex items-center justify-center bg-secondary text-lg w-10 h-10 font-medium rounded-full cursor-pointer hover:bg-secondary transition">
        {page}
      </div>
      {amountNextPages > 0 && (
        <>
          {new Array(amountNextPages).fill(null).map((_, index) => (
            <div
              key={index}
              onClick={() => onChangePage(page + index + 1)}
              className="flex items-center justify-center text-lg w-10 h-10 font-medium rounded-full cursor-pointer hover:bg-secondary transition"
            >
              {page + index + 1}
            </div>
          ))}
          <div
            onClick={() => onChangePage(page + 1)}
            className="flex items-center justify-center text-lg h-10 px-5 font-medium rounded-lg hover:bg-secondary transition cursor-pointer"
          >
            next
          </div>
        </>
      )}
    </div>
  );
};
