"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Card({
  id,
  image,
  title,
  description,
  price,
}: {
  id: number;
  image: any;
  title: string;
  description: string;
  price: number;
}) {
  const [innerId, setInnerId] = useState("");

  useEffect(() => {
    const x = `${id}-inner`;

    setInnerId(x);
  }, [id]);

  return (
    <div className="max-h-98 max-w-88 rounded-lg flex flex-col">
      <Image
        alt={title}
        src={image}
        width={352}
        height={160}
        className="rounded-t-lg"
      />
      <div className="max-h-58 max-w-88 rounded-b-lg p-6 flex flex-col gap-y-4 bg-okam-dark-green">
        <div className="text-gray-50 text-lg font-semibold text-left">
          {title}
        </div>

        <div className="text-gray-400 text-sm text-left overflow-auto no-scrollbar">
          {description}
        </div>

        <div className="flex flex-row justify-between">
          <span className="text-gray-50 font-medium py-4">{price} FIL</span>

          <button className="btn btn-md btn-secondary">View details</button>
        </div>
      </div>
    </div>
  );
}
