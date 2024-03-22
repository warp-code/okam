"use client";

import { useState, useEffect } from "react";

export default function Category({ name }: { name: string }) {
  const [innerId, setInnerId] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const x = `${name}-inner`;

    setInnerId(x);
  }, [name]);

  return (
    <label
      htmlFor={innerId}
      className="btn btn-xs btn-secondary cursor-pointer"
      onClick={() => {
        setChecked(!!checked);
      }}
    >
      {name}
      <input
        type="checkbox"
        id={innerId}
        name={innerId}
        className="absolute invisible"
        checked={checked}
        defaultChecked={false}
      />
    </label>
  );
}
