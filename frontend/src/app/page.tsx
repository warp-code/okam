"use client";

// Lit
import { useState } from "react";
import lit from "@/lib/lit";

// WAGMI
import { sepolia } from "viem/chains";
import { useConnect, useChainId, useBalance, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Home() {
  // LIT
  const [message, setMessage] = useState("Hello, Lit!");

  const [ciphertext, setCiphertext] = useState("");
  const [dataToEncryptHash, setDataToEncryptHash] = useState("");
  const [accessControlConditions, setAccessControlConditions] = useState<any>();

  const [decrypted, setDecrypted] = useState("");

  const encrypt = async () => {
    const a = await lit.encrypt(message);

    setCiphertext(a.ciphertext);
    setDataToEncryptHash(a.dataToEncryptHash);
    setAccessControlConditions(a.accessControlConditions);
  };

  const decrypt = async () => {
    const a = await lit.decrypt(
      ciphertext,
      dataToEncryptHash,
      accessControlConditions
    );

    setDecrypted(a.decryptedString);
  };

  // WAGMI
  const { connect } = useConnect();
  const { address } = useAccount();

  const { data: balance } = useBalance({ address: address });

  const connectWallet = () => {
    connect({ connector: injected(), chainId: sepolia.id });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
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
        <div>
          <textarea
            className="text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button onClick={() => encrypt()}>Encrypt!</button>
        <div>
          <label>Ciphertext:</label>
          <pre className="text-wrap break-words max-w-screen-md">
            {ciphertext}
          </pre>
        </div>
        <div>
          <label>Data to encrypt hash:</label>
          <pre className="text-wrap break-words max-w-screen-md">
            {dataToEncryptHash}
          </pre>
        </div>
        <button onClick={() => decrypt()}>Decrypt!</button>
        <div>
          <label>Decrypted:</label>
          <pre className="text-wrap break-words max-w-screen-md">
            {decrypted}
          </pre>
        </div>
      </div>
    </main>
  );
}
