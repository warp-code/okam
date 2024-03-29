"use client";

import { wagmiConfig } from "@/lib/config";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { ownershipTokenAbi } from "./ownershipTokenAbi";
import { decodeEventLog } from "viem";
import { useState } from "react";

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
    args: [BigInt(0), BigInt(0), BigInt(10000), fileCid],
  });

  const txReceipt = await waitForTransactionReceipt(wagmiConfig, {
    hash: txHash,
    confirmations: 2,
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
