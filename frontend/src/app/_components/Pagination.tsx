"use client";

import { useState, useEffect } from "react";

type PageModel = {
  number?: number;
  isEllipsis: boolean;
};

export default function Pagination() {
  const maxPageNumbers = 7;

  return (
    <div className="flex flex-row justify-between">
      <button type="button" className="btn text-gray-400 flex flex-row gap-x-2">
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
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      ></nav>

      <button type="button" className="btn text-gray-400 flex flex-row gap-x-2">
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
