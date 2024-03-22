"use client";

import { useState, useEffect } from "react";

type PageModel = {
  number?: number;
  isEllipsis: boolean;
};

export default function Pagination({ elementsNum }: { elementsNum: number }) {
  const maxPageNumbers = 7;

  const [pages, setPages] = useState<PageModel[]>([]);

  useEffect(() => {
    const maxPages = Math.ceil(elementsNum / 6);

    let pageModels = new Array<PageModel>();

    if (maxPages <= maxPageNumbers) {
      for (let i = 1; i <= maxPages; i++) {
        pageModels.push({
          number: i,
          isEllipsis: false,
        });
      }
    } else {
      const x = maxPages - 2;

      for (let i = 1; i <= maxPages; i++) {
        if (i <= 3 || i >= x) {
          pageModels.push({
            number: i,
            isEllipsis: false,
          });
        } else if (!pageModels.some((x) => x.isEllipsis)) {
          pageModels.push({
            number: i,
            isEllipsis: true,
          });
        }
      }

      pageModels = Array.from(new Set([...pageModels]));
    }

    setPages(pageModels);
  }, [elementsNum]);

  return (
    <div className="flex flex-row justify-between">
      <button
        type="button"
        className="btn text-sm text-gray-400 flex flex-row gap-x-2"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="current"
        >
          <path
            d="M15.8333 10H4.16666M4.16666 10L10 15.8334M4.16666 10L10 4.16669"
            stroke="currentColor"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Previous
      </button>

      <nav
        className="sm:inline-flex hidden rounded-lg gap-x-0.5"
        aria-label="Pagination"
      >
        {pages.map((page) => {
          if (page.isEllipsis) {
            return (
              <span key={page.number} className="btn btn-sm btn-quaternary">
                ...
              </span>
            );
          }
          return (
            <button
              key={page.number}
              type="button"
              className="btn btn-sm btn-quaternary"
            >
              {page.number}
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        className="btn text-sm text-gray-400 flex flex-row gap-x-2"
      >
        Next
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="current"
        >
          <path
            d="M4.16669 10H15.8334M15.8334 10L10 4.16669M15.8334 10L10 15.8334"
            stroke="currentColor"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
