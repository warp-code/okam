"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "@/app/_components/LoadingIndicator";
import { useAccount } from "wagmi";
import { getOne } from "@/app/actions";
import { Dataset } from "@/app/types";
import { nftStorageIpfsHost } from "@/app/constants";
import DatasetChart from "@/app/details/[datasetId]/DatasetChart";

export default function Details() {
  const params = useParams();
  const { address, isDisconnected } = useAccount();

  const { isLoading, error, data } = useQuery({
    queryKey: ["datasets", params.datasetId],
    queryFn: async () => {
      const { data, error } = await getOne<Dataset>(
        "datasets",
        Number.parseInt(params.datasetId as string)
      );

      if (error) {
        console.error(error);
        return {} as Dataset;
      }

      return data;
    },
  });

  if (error) {
    return console.error(error);
  }

  return (
    <div className="h-full max-w-270 flex flex-col gap-y-12 mx-auto">
      <div className="min-w-full">
        {isLoading && (
          <div className="h-24 w-24 mx-auto mt-40">
            <LoadingIndicator />
          </div>
        )}

        {!isLoading && data && (
          <>
            <h2 className="text-gray-50 font-semibold text-3xl pb-6">
              {data.name}
            </h2>

            <div className="flex sm:flex-row sm:flex-wrap flex-col sm:gap-x-8 gap-y-8">
              <div className="max-w-131 rounded-lg flex flex-col gap-y-4">
                <div className="rounded-lg max-w-131 h-64 bg-okam-card-gray">
                  <Image
                    alt={data.cover_image.name}
                    src={nftStorageIpfsHost + data.cover_image.cid}
                    width="0"
                    height="0"
                    sizes="100vw"
                    priority={true}
                    className="block mx-auto rounded-lg h-full w-auto"
                  />
                </div>

                <h4 className="text-gray-50 font-semibold text-2xl">
                  Description
                </h4>

                <div className="text-gray-400">{data.description}</div>

                <h4 className="text-gray-50 font-semibold text-2xl">File</h4>

                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-row gap-x-2.5">
                    <span className="btn btn-xs btn-secondary my-auto">
                      IPFS
                    </span>
                    <span className="text-sm font-medium text-gray-400 break-all my-auto">
                      {data.file_cid}
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
                  <span className="text-gray-400 font-semibold break-all my-auto ">
                    {data.author}
                  </span>
                </div>
              </div>

              <div className="max-w-131 w-full h-full rounded-lg flex flex-col">
                <div className="rounded-t-lg max-w-131 w-full h-64 bg-okam-card-gray py-5 sm:px-10 px-5 items-center">
                  {true && (
                    <DatasetChart
                      currentSupply={31}
                      quadraticParam={data.quadratic_param}
                      linearParam={data.linear_param}
                      constantParam={data.constant_param}
                    />
                  )}
                </div>

                <div className="max-w-131 rounded-b-lg pt-6 pb-8 px-6 flex flex-col gap-y-4 bg-okam-dark-green">
                  <div className="text-green-500 text-sm/7 font-semibold">
                    Current supply: 31
                  </div>

                  <div className="flex flex-row justify-between">
                    <span className="text-gray-50 font-medium py-4">
                      Buy price: 2946 FIL
                    </span>

                    <button
                      type="button"
                      className="btn btn-primary my-auto min-w-25 py-2 text-lg font-semibold rounded-lg"
                      disabled={isDisconnected}
                    >
                      Buy
                    </button>
                  </div>

                  <div className="flex flex-row justify-between">
                    <span className="text-gray-50 font-medium py-4">
                      Sell price: 2651 FIL
                    </span>

                    <button
                      type="button"
                      className="btn btn-tertiary my-auto min-w-25 py-2 text-lg font-semibold rounded-lg"
                      disabled={isDisconnected}
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
