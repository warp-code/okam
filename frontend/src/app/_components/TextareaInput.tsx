"use client";

import { useEffect, useState } from "react";

export default function TextareaInput({
  id,
  label,
  placeholder,
}: {
  id: string;
  label?: string | undefined;
  placeholder?: string | undefined;
}) {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="text-gray-50 text-lg text-left cursor-pointer"
        >
          {label}
        </label>
      )}

      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        rows={5}
        className="block w-full border border-green-700 focus:border-green-400 focus:outline-none rounded-2xl px-6 py-4 bg-okam-dark-green placeholder:text-gray-400 text-gray-50 resize-y no-resizer no-scrollbar"
      />

      <div className="text-left text-gray-400 text-sm">275 characters left</div>
    </>
  );
}
