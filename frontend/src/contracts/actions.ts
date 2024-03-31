"use client";

import { wagmiConfig } from "@/lib/config";
import { accessTokenAbi } from "@/contracts/accessTokenAbi";
import { ownershipTokenAbi } from "@/contracts/ownershipTokenAbi";
import {
  waitForTransactionReceipt,
  writeContract,
  readContract,
} from "wagmi/actions";
import { useState } from "react";
import { decodeEventLog } from "viem";

type Result<T, E = any> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: E;
    };

export function useMintOwnershipToken() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result<string> | undefined>(undefined);

  const mint = async (fileCid: string) => {
    setLoading(true);

    try {
      const tokenId = await mintOwnershipToken(fileCid);
      setResult({ ok: true, data: tokenId });
    } catch (e) {
      setResult({ ok: false, error: e });
    } finally {
      setLoading(false);
    }
  };

  return { mint, loading, result };
}

export async function mintOwnershipToken(fileCid: string): Promise<string> {
  const txHash = await writeContract(wagmiConfig, {
    abi: ownershipTokenAbi,
    address: process.env.NEXT_PUBLIC_OWNERSHIP_CONTRACT_ADDRESS,
    functionName: "registerOwner",
    args: [BigInt(1), BigInt(1), BigInt(1), fileCid],
  });

  const txReceipt = await waitForTransactionReceipt(wagmiConfig, {
    hash: txHash,
    confirmations: 1,
  });

  let tokenId: string | undefined = undefined;

  for (const log of txReceipt.logs) {
    const transferEvent = decodeEventLog({
      abi: ownershipTokenAbi,
      topics: log.topics,
      data: log.data,
      eventName: "Transfer",
    });

    tokenId = transferEvent.args.tokenId.toString();
  }

  if (!tokenId) {
    throw "No Transfer event was emitted as part of Ownership token minting.";
  }

  return tokenId;
}

export async function getSupply(ownerhipTokenId: bigint) {
  return await readContract(wagmiConfig, {
    abi: accessTokenAbi,
    address: process.env.NEXT_PUBLIC_ACCESS_CONTRACT_ADDRESS,
    functionName: "getSupply",
    args: [ownerhipTokenId],
  });
}

export async function getBuyPrice(ownerhipTokenId: bigint) {
  return await readContract(wagmiConfig, {
    abi: accessTokenAbi,
    address: process.env.NEXT_PUBLIC_ACCESS_CONTRACT_ADDRESS,
    functionName: "buyPrice",
    args: [ownerhipTokenId],
  });
}

export async function getSellPrice(ownerhipTokenId: bigint) {
  return await readContract(wagmiConfig, {
    abi: accessTokenAbi,
    address: process.env.NEXT_PUBLIC_ACCESS_CONTRACT_ADDRESS,
    functionName: "sellPrice",
    args: [ownerhipTokenId],
  });
}

export async function mintAccessToken(
  ownerhipTokenId: bigint,
  address: `0x${string}`,
  buyPrice: bigint
) {
  const txHash = await writeContract(wagmiConfig, {
    abi: accessTokenAbi,
    address: process.env.NEXT_PUBLIC_ACCESS_CONTRACT_ADDRESS,
    functionName: "mint",
    args: [ownerhipTokenId, address],
    value: buyPrice,
  });

  const txReceipt = await waitForTransactionReceipt(wagmiConfig, {
    hash: txHash,
    confirmations: 1,
  });

  let tokenId: string | undefined = undefined;

  for (const log of txReceipt.logs) {
    const transferEvent = decodeEventLog({
      abi: accessTokenAbi,
      topics: log.topics,
      data: log.data,
      eventName: "Transfer",
    });

    tokenId = transferEvent.args.tokenId.toString();
  }

  if (!tokenId) {
    throw "No Transfer event was emitted as part of Access token minting.";
  }

  return tokenId;
}

export async function burnAccessToken(tokenIdToBurn: bigint) {
  const txHash = await writeContract(wagmiConfig, {
    abi: accessTokenAbi,
    address: process.env.NEXT_PUBLIC_ACCESS_CONTRACT_ADDRESS,
    functionName: "burn",
    args: [tokenIdToBurn],
  });

  const txReceipt = await waitForTransactionReceipt(wagmiConfig, {
    hash: txHash,
    confirmations: 1,
  });

  let tokenId: string | undefined = undefined;

  for (const log of txReceipt.logs) {
    const transferEvent = decodeEventLog({
      abi: accessTokenAbi,
      topics: log.topics,
      data: log.data,
      eventName: "Transfer",
    });

    tokenId = transferEvent.args.tokenId.toString();
  }

  if (!tokenId) {
    throw "No Transfer event was emitted as part of Access token burning.";
  }

  return tokenId;
}
