"use client";

import TextInput from '@/app/_components/TextInput';

export default function SearchBar({ name, placeholder }: { name: string, placeholder: string; }) {
  return (
    <div className="relative">
      <TextInput name={name} placeholder={placeholder} />
    </div >
  );
}