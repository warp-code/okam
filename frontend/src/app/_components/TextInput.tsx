"use client";

import { useEffect, useState } from "react";

export default function TextInput({
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

      <input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        className="block w-full border border-green-700 focus:border-green-400 focus:outline-none rounded-2xl px-6 py-4 bg-okam-dark-green placeholder:text-gray-400 text-gray-50"
      />
    </>
  );
}
