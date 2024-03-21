"use client";

import { useState, useEffect } from 'react';

export default function Category({ name }: { name: string; }) {
  const [innerId, setInnerId] = useState("");

  useEffect(() => {
    const x = `${name}-inner`;

    setInnerId(x);
  }, [name]);

  return (
    <label
      htmlFor={innerId}
      className="btn btn-sm btn-secondary">
      {name}
      <input
        type="checkbox"
        id={innerId}
        name={name}
        className='absolute inset-0 invisible'
      />
    </label>
  );
}