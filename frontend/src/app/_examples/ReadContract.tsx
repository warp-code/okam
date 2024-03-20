"use client"

import { accessTokenAbi } from "@/contracts/accessTokenAbi";
import { ownershipTokenAbi } from "@/contracts/ownershipTokenAbi";
import { wagmiConfig } from "@/lib/config";
import { useState } from "react";
import { readContract } from "wagmi/actions";

export default function ReadContract() {
  const [quadratic, setQuadratic] = useState<bigint | undefined>(undefined);
  const [linear, setLinear] = useState<bigint | undefined>(undefined);
  const [constant, setConstant] = useState<bigint | undefined>(undefined);

  const getCurveParams = async () => {
    const result = await readContract(wagmiConfig, {
      abi: ownershipTokenAbi,
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      functionName: "getCurveParams",
      args: [BigInt(1)],
    });

    if (result) {
      setQuadratic(result[0]);
      setLinear(result[1]);
      setConstant(result[2]);
    }
  };

  return (
    <div>
      {quadratic != undefined &&
      linear != undefined &&
      constant != undefined ? (
        <>
          <div>Quadratic: {quadratic.toString()}</div>
          <div>Linear: {linear.toString()}</div>
          <div>Constant: {constant.toString()}</div>
        </>
      ) : (
        <button className="bg-gray-500 px-3 py-1.5" onClick={() => getCurveParams()}>Get curve params.</button>
      )}
    </div>
  );
}
