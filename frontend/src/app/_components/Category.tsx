"use client";

import { useState } from "react";

export default function Category({ id, label }: { id: string; label: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <label
      htmlFor={id}
      className={`btn btn-xs btn-secondary cursor-pointer select-none ${
        checked ? "!bg-green-900" : ""
      }`}
      onClick={() => setChecked((prev) => !prev)}
    >
      {label}
      <input
        type="checkbox"
        id={id}
        name={id}
        className="sr-only"
        checked={checked}
        onChange={() => setChecked((prev) => !prev)}
      />
    </label>
  );
}
