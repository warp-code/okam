"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "@/app/_components/LoadingIndicator";
import { useAccount } from "wagmi";
import {
  create,
  deleteOne,
  getTokensForAddress,
  getOne,
} from "@/utils/actions/serverActions";
import { Dataset, DatasetTradingInfo, TokenHolder } from "@/app/types";
import DatasetChart from "@/app/details/[datasetId]/DatasetChart";
import {
  burnUsageToken,
  getBuyPrice,
  getSellPrice,
  getSupply,
  mintAccessToken,
  mintUsageToken,
} from "@/contracts/actions";
import { formatEther } from "viem";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export default function Details() {
  const params = useParams();
  const { address, isDisconnected } = useAccount();
  const [token, setToken] = useState("");

  const {
    isFetching: isDatasetQueryFetching,
    error: datasetQueryError,
    data: datasetQueryData,
  } = useQuery({
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

  const {
    isFetching: isTokenHolderQueryFetching,
    error: tokenHolderQueryError,
    data: tokenHolderQueryData,
    refetch: tokenHolderQueryRefetch,
  } = useQuery({
    queryKey: ["token_holders", params.datasetId, address],
    queryFn: async () => {
      const { data, error } = await getTokensForAddress(
        address as `0x${string}`,
        Number.parseInt(params.datasetId as string)
      );

      if (error) {
        console.error(
          "An error occured while fetching tokens for address: ",
          error
        );

        return [] as TokenHolder[];
      }

      return data;
    },
  });

  const {
    isFetching: isDatasetTradingInfoFetching,
    error: datasetTradingInfoError,
    data: datasetTradingInfoData,
    refetch: refetchDataTradingInfo,
  } = useQuery({
    queryKey: ["datasetTradingInfo", datasetQueryData?.token_id],
    queryFn: async () => {
      if (datasetQueryData) {
        const ownershipTokenId = BigInt(datasetQueryData.token_id);

        let res;

        try {
          res = await Promise.all([
            await getSupply(ownershipTokenId),
            await getBuyPrice(ownershipTokenId),
            await getSellPrice(ownershipTokenId),
          ]);
        } catch (error) {
          console.error(
            "An error occured while fetching dateset trading info: ",
            error
          );

          return {} as DatasetTradingInfo;
        }

        return {
          currentSupply: res[0],
          buyPrice: res[1],
          sellPrice: res[2],
        } as DatasetTradingInfo;
      }

      return {} as DatasetTradingInfo;
    },
  });

  const mintAccessTokenToAddress = async ({
    address,
  }: {
    address: `0x${string}`;
  }) => {
    if (tokenHolderQueryData?.length) {
      const accessTokenId = await mintAccessToken(
        address,
        BigInt(tokenHolderQueryData[0].token_id)
      );

      setToken(accessTokenId);

      form.reset();
    }
  };

  const form = useForm({
    defaultValues: {
      address: "" as `0x${string}`,
    },
    onSubmit: async (event) => await mintAccessTokenToAddress(event.value),
  });

  if (datasetQueryError) {
    console.error(datasetQueryError);
    return;
  }

  if (datasetTradingInfoError) {
    console.error(datasetTradingInfoError);
    return;
  }

  if (tokenHolderQueryError) {
    console.error(tokenHolderQueryError);
    return;
  }

  const buy = async () => {
    let usageTokenId;

    try {
      usageTokenId = await mintUsageToken(
        BigInt(datasetQueryData?.token_id as string),
        datasetTradingInfoData?.buyPrice as bigint
      );
    } catch (error) {
      console.error("An error occured while minting access token: ", error);
      return;
    }

    const { error } = await create<TokenHolder>("token_holders", [
      {
        address: address,
        token_id: usageTokenId,
        dataset_id: datasetQueryData?.id,
      } as TokenHolder,
    ]);

    if (error) {
      console.error("An error occured while saving token holder: ", error);
      return;
    }

    await refetchDataTradingInfo();
    await tokenHolderQueryRefetch();
  };

  const sell = async () => {
    if (!!tokenHolderQueryData?.length) {
      const tokenHolder = tokenHolderQueryData[0];

      try {
        await burnUsageToken(BigInt(tokenHolder.token_id));
      } catch (error) {
        console.error("An error occured while burning access token: ", error);
        return;
      }

      const { error } = await deleteOne("token_holders", tokenHolder.id);

      if (error) {
        console.error("An error occured while deleting token holder: ", error);
        return;
      }

      await refetchDataTradingInfo();
      await tokenHolderQueryRefetch();
    }
  };

  return (
    <div className="h-full max-w-270 flex flex-col gap-y-12 mx-auto">
      <div className="min-w-full">
        {(isDatasetQueryFetching ||
          !datasetQueryData ||
          isDatasetTradingInfoFetching) && (
          <div className="h-24 w-24 mx-auto mt-40">
            <LoadingIndicator />
          </div>
        )}

        {!isDatasetQueryFetching && datasetQueryData && (
          <>
            <h2 className="text-gray-50 font-semibold text-3xl pb-6">
              {datasetQueryData.name}
            </h2>

            <div className="flex sm:flex-row sm:flex-wrap flex-col sm:gap-x-8 gap-y-8">
              <div className="max-w-131 rounded-lg flex flex-col gap-y-4">
                <div className="rounded-lg max-w-131 h-64 bg-okam-card-gray">
                  <Image
                    alt={datasetQueryData.cover_image.name}
                    src={datasetQueryData.cover_image.url}
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

                <div className="text-gray-400">
                  {datasetQueryData.description}
                </div>

                <h4 className="text-gray-50 font-semibold text-2xl">File</h4>

                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-row gap-x-2.5">
                    <span className="btn btn-xs btn-secondary my-auto">
                      IPFS
                    </span>
                    <span className="text-sm font-medium text-gray-400 break-all my-auto">
                      {datasetQueryData.file_cid}
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
                    {datasetQueryData.author}
                  </span>
                </div>
              </div>

              <div className="max-w-131 w-full h-full rounded-lg flex flex-col">
                <div className="rounded-t-lg max-w-131 w-full h-64 bg-okam-card-gray py-5 sm:px-10 px-5 items-center">
                  {
                    <DatasetChart
                      currentSupply={Number(
                        datasetTradingInfoData?.currentSupply
                      )}
                      quadraticParam={datasetQueryData.quadratic_param}
                      linearParam={datasetQueryData.linear_param}
                      constantParam={datasetQueryData.constant_param}
                    />
                  }
                </div>

                <div className="max-w-131 rounded-b-lg pt-6 pb-8 px-6 flex flex-col gap-y-4 bg-okam-dark-green">
                  <div className="text-green-500 text-sm/7 font-semibold">
                    Current supply:{" "}
                    {datasetTradingInfoData?.currentSupply.toString()}
                  </div>

                  <div className="flex flex-row justify-between">
                    <span className="text-gray-50 font-medium py-4">
                      Buy price:{" "}
                      {!!datasetTradingInfoData?.buyPrice &&
                        formatEther(datasetTradingInfoData.buyPrice)}{" "}
                      ETH
                    </span>

                    <button
                      type="button"
                      className="btn btn-primary my-auto min-w-25 py-2 text-lg font-semibold rounded-lg"
                      disabled={isDisconnected}
                      onClick={async () => buy()}
                    >
                      Buy
                    </button>
                  </div>

                  <div className="flex flex-row justify-between">
                    <span className="text-gray-50 font-medium py-4">
                      Sell price:{" "}
                      {!!datasetTradingInfoData?.sellPrice
                        ? formatEther(datasetTradingInfoData.sellPrice)
                        : "-"}{" "}
                      ETH
                    </span>

                    <button
                      type="button"
                      className="btn btn-tertiary my-auto min-w-25 py-2 text-lg font-semibold rounded-lg"
                      disabled={
                        isDisconnected ||
                        !!tokenHolderQueryError ||
                        isTokenHolderQueryFetching ||
                        !tokenHolderQueryData?.length
                      }
                      onClick={async () => await sell()}
                    >
                      Sell
                    </button>
                  </div>

                  {!!tokenHolderQueryData?.length && (
                    <>
                      <form
                        className="flex flex-row gap-x-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          void form.handleSubmit();
                        }}
                      >
                        <div className="flex flex-grow">
                          <form.Field
                            name="address"
                            validators={{
                              onChange: ({ value: address }) =>
                                !address.length
                                  ? "Address is required."
                                  : undefined,
                            }}
                          >
                            {(field) => (
                              <div className="flex flex-col gap-y-4 min-w-full mt-auto">
                                <label
                                  htmlFor={field.name}
                                  className="text-gray-50 font-medium text-left cursor-pointer mr-auto"
                                >
                                  Address
                                </label>

                                <input
                                  type="text"
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onChange={(event) => {
                                    field.handleChange(
                                      event.target.value as `0x${string}`
                                    );

                                    if (token) {
                                      setToken("");
                                    }
                                  }}
                                  disabled={form.state.isSubmitting}
                                  className="block w-full border border-green-700 focus:border-green-400 focus:outline-none rounded-2xl px-6 py-3 bg-okam-dark-green placeholder:text-gray-400 text-gray-50 text-sm"
                                />
                              </div>
                            )}
                          </form.Field>
                        </div>

                        <form.Subscribe>
                          {({ canSubmit, isSubmitting }) => (
                            <button
                              type="submit"
                              className="btn btn-primary mt-auto min-w-25 py-2 px-4 text-lg font-semibold rounded-lg"
                              disabled={!canSubmit}
                            >
                              {isSubmitting ? "Minting..." : "Mint usage token"}
                            </button>
                          )}
                        </form.Subscribe>
                      </form>
                    </>
                  )}
                </div>

                {token && form.state.isPristine && (
                  <div className="max-w-131 mt-8 px-6 text-gray-50">
                    Successfully minted usage token {token} to address {address}
                    .
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
