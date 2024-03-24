"use client";

import { Dataset, datasets } from "@/app/_examples/datasets";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function Details() {
  const params = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["datasets"],
    queryFn: findDataset,
  });

  function findDataset(): Dataset | undefined {
    return datasets.find(
      (x) => x.id === Number.parseInt(params.datasetId as string)
    );
  }

  if (error) {
    return console.error(error);
  }

  return (
    <div className="h-full max-w-270 flex flex-col gap-y-12 mx-auto">
      <div className="min-w-full">
        {!isPending && (
          <>
            <h2 className="text-gray-50 font-semibold text-3xl pb-6">
              {data?.title}
            </h2>

            <div className="flex md:flex-row flex-col md:gap-x-8 gap-y-8">
              <div className="max-w-131 rounded-lg flex flex-col gap-y-4">
                <Image
                  alt={data?.title as string}
                  src={data?.image as StaticImageData}
                  width={524}
                  height={256}
                  className="rounded-lg"
                />

                <h4 className="text-gray-50 font-semibold text-2xl">
                  Description
                </h4>

                <div className="text-gray-400">{data?.description}</div>

                <h4 className="text-gray-50 font-semibold text-2xl">Files</h4>

                <div className="flex flex-col gap-y-3">
                  {data?.fileCids.map((fileCid) => {
                    return (
                      <div key={fileCid} className="flex flex-row gap-x-2.5">
                        <span className="btn btn-xs btn-secondary my-auto">
                          IPFS
                        </span>
                        <span className="text-sm font-medium text-gray-400 break-all my-auto">
                          {fileCid}
                        </span>
                      </div>
                    );
                  })}
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
                  <span className="text-gray-400 font-semibold break-all my-auto ">
                    {data?.author}
                  </span>
                </div>
              </div>

              <div className="max-h-115 max-w-131 rounded-lg flex flex-col">
                {/* chart goes here instead of the image */}
                <Image
                  alt={data?.title as string}
                  src={data?.image as StaticImageData}
                  width={524}
                  height={256}
                  className="rounded-t-lg"
                />
                <div className="max-w-131 rounded-b-lg pt-6 pb-8 px-6 flex flex-col gap-y-4 bg-okam-dark-green">
                  <div className="text-green-500 text-sm/7 font-semibold">
                    Current supply: {data?.currentSupply}
                  </div>

                  <div className="flex flex-row justify-between">
                    <span className="text-gray-50 font-medium py-4">
                      Buy price: {data?.buyPrice} FIL
                    </span>

                    <button
                      type="button"
                      className="btn btn-md btn-primary my-auto min-w-25"
                    >
                      Buy
                    </button>
                  </div>

                  <div className="flex flex-row justify-between">
                    <span className="text-gray-50 font-medium py-4">
                      Sell price: {data?.sellPrice} FIL
                    </span>

                    <button
                      type="button"
                      className="btn btn-md btn-tertiary my-auto min-w-25"
                    >
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
