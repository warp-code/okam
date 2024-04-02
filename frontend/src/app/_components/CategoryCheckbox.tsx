"use client";

import { ChangeEventHandler } from "react";

export default function CategoryCheckbox({
  name,
  label,
  value,
  handleOnChange,
  disabled,
}: {
  name: string;
  label: string;
  value?: boolean;
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
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
        disabled={disabled}
      />
    </label>
  );
}
