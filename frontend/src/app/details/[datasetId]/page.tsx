"use client";

import { useEffect, useState } from "react";
import { Dataset, datasets } from "@/app/_examples/datasets";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";

export default function Details() {
  const [dataset, setDataset] = useState<Dataset>();
  const params = useParams();

  useEffect(() => {
    const x = datasets.find(
      (x) => x.id === Number.parseInt(params.datasetId as string)
    );

    setDataset(x);
  }, [params.datasetId]);

  return (
    <div className="h-full max-w-270 flex flex-col gap-y-12 mx-auto">
      <div className="min-w-full text-left">
        <h2 className="text-gray-50 font-semibold text-3xl pb-6">
          {dataset?.title}
        </h2>

        <div className="flex flex-row sm:gap-x-8 gap-y-8">
          <div className="flex flex-col gap-y-4 max-w-131">
            <Image
              alt={dataset?.title as string}
              src={dataset?.image as StaticImageData}
              width={524}
              height={256}
              className="rounded-lg"
            />

            <h4 className="text-gray-50 font-semibold text-2xl">Description</h4>

            <div className="text-gray-600">{dataset?.description}</div>

            <h4 className="text-gray-50 font-semibold text-2xl">Files</h4>

            <div className="flex flex-col gap-y-3">
              <div className="flex flex-row gap-x-2.5">
                <span className="btn btn-xs btn-secondary">IPFS</span>
                <span className="text-gray-600">
                  QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
                </span>
              </div>

              <div className="flex flex-row gap-x-2.5">
                <span className="btn btn-xs btn-secondary">IPFS</span>
                <span className="text-gray-600">
                  QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
                </span>
              </div>
            </div>

            <h4 className="text-gray-50 font-semibold text-2xl">Author</h4>

            <div className="flex flex-row gap-x-2.5">
              <span className="btn btn-xs btn-secondary">IPFS</span>
              <span className="text-gray-600">
                0x1c35d2C91E1F2Dc3BA949De78Da32f3FdA5c9863
              </span>
            </div>
          </div>

          <div className="flex flex-col"></div>
        </div>
      </div>
    </div>
  );
}
