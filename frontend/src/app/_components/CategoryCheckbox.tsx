"use client";

import { ChangeEventHandler } from "react";

export default function CategoryCheckbox({
  name,
  label,
  value,
  handleOnChange,
}: {
  name: string;
  label: string;
  value?: boolean;
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label
      htmlFor={name}
      className={`btn btn-xs btn-secondary cursor-pointer select-none ${
        value ? "!bg-green-900 !border-green-300" : ""
      }`}
    >
      {label}
      <input
        type="checkbox"
        id={name}
        name={name}
        className="sr-only"
        checked={value ?? false}
        onChange={handleOnChange}
      />
    </label>
  );
}
