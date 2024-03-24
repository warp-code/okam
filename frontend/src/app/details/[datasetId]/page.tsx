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
      <div className="min-w-full text-center">
        {dataset && (
          <>
            <h2 className="text-gray-50 font-semibold text-3xl pb-6 text-left">
              {dataset?.title}
            </h2>

            <div className="flex sm:flex-row flex-col w-full sm:gap-x-8 gap-y-8">
              <div className="flex flex-col gap-y-4 max-w-131">
                <Image
                  alt={dataset?.title as string}
                  src={dataset?.image as StaticImageData}
                  width={524}
                  height={256}
                  className="rounded-lg"
                />

                <h4 className="text-gray-50 font-semibold text-2xl">
                  Description
                </h4>

                <div className="text-gray-600">{dataset?.description}</div>

                <h4 className="text-gray-50 font-semibold text-2xl">Files</h4>

                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-row gap-x-2.5">
                    <span className="btn btn-xs btn-secondary my-auto">
                      IPFS
                    </span>
                    <span className="text-gray-600 break-all my-auto">
                      QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
                    </span>
                  </div>

                  <div className="flex flex-row gap-x-2.5">
                    <span className="btn btn-xs btn-secondary my-auto">
                      IPFS
                    </span>
                    <span className="text-gray-600 break-all my-auto">
                      QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
                    </span>
                  </div>
                </div>

                <h4 className="text-gray-50 font-semibold text-2xl">Author</h4>

                <div className="flex flex-row gap-x-2.5">
                  <span className="my-auto">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" rx="20" fill="#1C2120" />
                      <g opacity="0.08">
                        <rect
                          x="0.375"
                          y="0.375"
                          width="39.25"
                          height="39.25"
                          rx="19.625"
                          stroke="#101828"
                          strokeWidth="0.75"
                        />
                      </g>
                      <path
                        d="M28 29C28 27.6044 28 26.9067 27.8278 26.3389C27.44 25.0605 26.4395 24.06 25.1611 23.6722C24.5933 23.5 23.8956 23.5 22.5 23.5H17.5C16.1044 23.5 15.4067 23.5 14.8389 23.6722C13.5605 24.06 12.56 25.0605 12.1722 26.3389C12 26.9067 12 27.6044 12 29M24.5 15.5C24.5 17.9853 22.4853 20 20 20C17.5147 20 15.5 17.9853 15.5 15.5C15.5 13.0147 17.5147 11 20 11C22.4853 11 24.5 13.0147 24.5 15.5Z"
                        stroke="#5FE9D0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-600 break-all my-auto">
                    0x1c35d2C91E1F2Dc3BA949De78Da32f3FdA5c9863
                  </span>
                </div>
              </div>

              <div className="max-h-115 max-w-131 rounded-lg flex flex-col">
                <Image
                  alt={dataset?.title as string}
                  src={dataset?.image as StaticImageData}
                  width={524}
                  height={256}
                  className="rounded-t-lg"
                />
                <div className="max-w-131 rounded-b-lg pt-6 pb-8 px-6 flex flex-col gap-y-4 bg-okam-dark-green">
                  <div className="text-green-500 text-sm/7 font-semibold text-left">
                    Current supply: 120
                  </div>

                  <div className="flex flex-row justify-between">
                    <span className="text-gray-50 font-medium py-4">
                      Buy price: {dataset?.price} FIL
                    </span>

                    <button className="btn btn-md btn-primary my-auto min-w-25">
                      Buy
                    </button>
                  </div>

                  <div className="flex flex-row justify-between">
                    <span className="text-gray-50 font-medium py-4">
                      Sell price: {dataset?.price} FIL
                    </span>

                    <button className="btn btn-md btn-tertiary my-auto min-w-25">
                      Sell
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
