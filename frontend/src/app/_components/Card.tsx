"use client";

import { OkamCoverImage } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatEther } from "viem";

export default function Card({
  id,
  image,
  title,
  description,
  buyPrice,
}: {
  id: number;
  image: OkamCoverImage;
  title: string;
  description: string;
  buyPrice: bigint;
}) {
  const router = useRouter();

  return (
    <div className="max-h-98 max-w-88 w-full rounded-lg flex flex-col">
      <div className="relative flex max-w-88 max-h-40 w-full h-full bg-okam-card-gray rounded-t-lg">
        <Image
          alt={image.name}
          src={image.url}
          width="0"
          height="0"
          sizes="100vw"
          priority={true}
          className="block mx-auto rounded-t-lg h-full w-auto"
        />
      </div>
      <div className="max-h-58 max-w-88 rounded-b-lg p-6 flex flex-col gap-y-4 bg-okam-dark-green">
        <div className="text-gray-50 text-lg font-semibold text-left">
          {title}
        </div>

        <div className="max-h-15  text-gray-400 text-sm text-left overflow-auto no-scrollbar">
          {description}
        </div>

        <div className="flex flex-row justify-between">
          <span className="text-gray-50 font-medium py-4">
            {formatEther(buyPrice).slice(0, 6)} ETH
          </span>

          <button
            type="button"
            className="btn btn-md btn-secondary"
            onClick={() => router.push(`/details/${id}`)}
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
}
