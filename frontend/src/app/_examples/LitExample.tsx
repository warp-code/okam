"use client";

// Lit
import { useState } from "react";
import { lit } from "@/lib/lit";

export default function LitExample() {
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

  return (
    <div>
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
        <pre className="text-wrap break-words max-w-screen-md">{decrypted}</pre>
      </div>
    </div>
  );
}
