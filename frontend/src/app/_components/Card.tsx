"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import placeholder from '@/assets/images/placeholder_green.png';

export default function Card({ id, image, title, description, buyPrice }: { id: string, image: any, title: string, description: string, buyPrice: number; }) {
  const [innerId, setInnerId] = useState("");

  useEffect(() => {
    const x = `${id}-inner`;

    setInnerId(x);
  }, [id]);

  return (
    <div className="h-98 w-88 rounded-lg flex flex-col">
      <Image
        alt={title}
        src={image || placeholder}
        width={352}
        height={160}
        className="rounded-t-lg"
      />
      <div className="h-58 w-88 rounded-b-lg p-6 flex flex-col gap-y-4">
        <div className="text-gray-50 text-lg font-semibold">
          {title}
        </div>

        <div className="text-gray-400 text-sm">
          {description}
        </div>

        <div className="flex flex-row justify-between">
          <span className="text-gray-50 font-medium py-4">
            {buyPrice} FIL
          </span>

          <button className="btn btn-md btn-secondary">
            View details
          </button>
        </div>
      </div>
    </div>
  );
}