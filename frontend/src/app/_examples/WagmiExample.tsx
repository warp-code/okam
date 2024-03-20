"use client";

// WAGMI
import { anvil, sepolia } from "viem/chains";
import { useConnect, useChainId, useBalance, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";

export default function WagmiExample() {
  // WAGMI
  const { connect } = useConnect();
  const { address } = useAccount();

  const { data: balance } = useBalance({ address: address });

  const connectWallet = () => {
    connect({ connector: injected(), chainId: anvil.id });
  };

  return (
    <div>
      <button
        className="bg-gray-500 text-white px-3 py-1.5"
        onClick={() => {
          connectWallet();
        }}
      >
        Connect to wallet
      </button>
      <pre>Address: {address}</pre>
      <pre>
        Balance: {balance?.value.toString()} {balance?.symbol}
      </pre>
    </div>
  );
}
