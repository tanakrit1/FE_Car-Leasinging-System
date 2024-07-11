import React, { useState, useEffect, useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
  customRows?: boolean;
  returnPageNo: (page: number) => void;
  returnLimit: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  limit,
  totalItems,
  returnPageNo,
  returnLimit,
  customRows,
}) => {
  const [localCurrentPage, setLocalCurrentPage] = useState<number>(currentPage);
  const [localLimit, setLocalLimit] = useState<number>(limit);

  useEffect(() => {
    setLocalCurrentPage(currentPage);
  }, [currentPage]);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setLocalCurrentPage(page);
      returnPageNo(page);
    }
  };

  const nextPage = () => {
    if (localCurrentPage < totalPages) {
      changePage(localCurrentPage + 1);
    }
  };

  const prevPage = () => {
    if (localCurrentPage > 1) {
      changePage(localCurrentPage - 1);
    }
  };

  const pagesToShow = useMemo(() => {
    let pages: (number | string)[] = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (localCurrentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (localCurrentPage > totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = localCurrentPage - 2; i <= localCurrentPage + 2; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  }, [localCurrentPage, totalPages]);

  const onChangeLimit = (e: any) => {
    setLocalLimit(e.target.value);
    returnLimit(e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex space-x-3 items-center">
          {customRows && (
            <>
              <span>ข้อมูลทั้งหมด {totalItems} แถว ที่แสดง</span>
              <select
                className="rounded-lg w-24 py-3 px-2 bg-white text-black"
                value={localLimit}
                onChange={onChangeLimit}
              >
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span>แถว</span>
            </>
          )}
        </div>
        <div aria-label="" className="flex items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              prevPage();
            }}
            className="p-2 mr-4 rounded-full hover:bg-white hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </a>

          {pagesToShow.map((pageNumber, index) => (
            <React.Fragment key={index}>
              {pageNumber === "..." ? (
                <span>...</span>
              ) : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    changePage(Number(pageNumber));
                  }}
                  className={`px-4 py-2 rounded-full ${
                    localCurrentPage === pageNumber
                      ? "bg-orange-700 text-white"
                      : "hover:bg-white hover:text-black"
                  }`}
                >
                  {pageNumber}
                </a>
              )}
            </React.Fragment>
          ))}

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              nextPage();
            }}
            className="p-2 ml-4 rounded-full hover:bg-white hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default Pagination;
