"use client";

import { ValidationError } from "@tanstack/react-form";
import { ChangeEventHandler } from "react";

export default function TextareaInput({
  name,
  value,
  label,
  placeholder,
  handleOnChange,
  errors,
}: {
  name: string;
  value: string;
  label?: string | undefined;
  placeholder?: string | undefined;
  handleOnChange: ChangeEventHandler<HTMLTextAreaElement>;
  errors?: ValidationError[];
}) {
  return (
    <div className="flex flex-col gap-y-6 min-w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-gray-50 text-lg text-left cursor-pointer mr-auto"
        >
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
        rows={5}
        className="block w-full border border-green-700 focus:border-green-400 focus:outline-none rounded-2xl px-6 py-4 bg-okam-dark-green placeholder:text-gray-400 text-gray-50 resize-y no-resizer no-scrollbar"
      />

      {(errors?.length as number) > 0 && (
        <div className="text-left text-gray-400 text-sm">
          {errors?.join(" ")}
        </div>
      )}
    </div>
  );
}
