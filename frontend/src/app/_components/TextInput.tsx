"use client";

import { useState, useEffect } from "react";

export default function TextInput({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) {
  const [innerId, setInnerId] = useState("");

  useEffect(() => {
    const x = `${name}-inner`;

    setInnerId(x);
  }, [name]);

  return (
    <input
      type="text"
      id={innerId}
      name={name}
      placeholder={placeholder}
      className="block w-full border border-green-700 focus:border-green-400 focus:outline-none rounded-2xl px-6 py-4 bg-okam-dark-green placeholder:text-gray-400 text-gray-50"
    />
  );
}
