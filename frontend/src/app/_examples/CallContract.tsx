"use client";

import { accessTokenAbi } from "@/contracts/accessTokenAbi";
import { ownershipTokenAbi } from "@/contracts/ownershipTokenAbi";
import { wagmiConfig } from "@/lib/config";
import { useState } from "react";
import { parseGwei } from "viem";
import { writeContract } from "wagmi/actions";

export default function WriteContract() {
  const [constant, setConstant] = useState<bigint | undefined>(undefined);

  const mintToken = async () => {
    const result = await writeContract(wagmiConfig, {
      abi: ownershipTokenAbi,
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      functionName: "registerOwner",
      args: [BigInt(1), BigInt(2), BigInt(3)],
    }).catch((reason) => {
      console.log(reason);
    })

    if (result) {
    }
  };

  return (
    <div>
      <button className="bg-gray-500 px-3 py-1.5" onClick={() => mintToken()}>
        Mint token!
      </button>
    </div>
  );
}
