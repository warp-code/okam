"use client";

import { litConfig } from "@/lib/config";
import * as LitJsSdk from "@lit-protocol/lit-node-client";

const client = new LitJsSdk.LitNodeClient({
  litNetwork: litConfig.litNetwork,
});

const chain = litConfig.ethChain;

function getAccessControlConditions(tokenId: string) {
  return [
    {
      chain: chain,
      functionName: "hasAccess",
      contractAddress: process.env.NEXT_PUBLIC_ACCESS_CONTRACT_ADDRESS,
      functionParams: [":userAddress", tokenId],
      returnValueTest: {
        comparator: "=",
        value: "true",
      },
      functionAbi: {
        type: "function",
        name: "hasAccess",
        inputs: [
          {
            name: "userAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "usageTokenId",
            type: "uint256",
            internalType: "uint256",
          },
        ],
        outputs: [
          {
            name: "",
            type: "bool",
            internalType: "bool",
          },
        ],
        stateMutability: "view",
      },
    },
  ];
}

class Lit {
  private litNodeClient: any;

  async connect() {
    await client.connect();
    this.litNodeClient = client;
  }

  async encryptForOwnershipToken(file: File, tokenId: string) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: chain,
      nonce: "",
    });

    const accessControlConditions = getAccessControlConditions(tokenId);

    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptFile(
      {
        authSig: authSig,
        chain: chain,
        file: file,
        accessControlConditions: accessControlConditions,
      },
      this.litNodeClient
    );

    return {
      ciphertext,
      dataToEncryptHash,
      accessControlConditions,
    };
  }

  async decryptForOwnershipToken(
    ciphertext: string,
    dataToEncryptHash: string,
    tokenId: string
  ) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: chain,
      nonce: "",
    });

    const decryptedBytes = await LitJsSdk.decryptToFile(
      {
        accessControlConditions: getAccessControlConditions(tokenId),
        ciphertext,
        dataToEncryptHash,
        authSig,
        chain: chain,
      },
      this.litNodeClient
    );
    return { decryptedBytes };
  }

  async encrypt(message: string) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: chain,
      nonce: "",
    });

    const accessControlConditions = [
      {
        chain: chain,
        method: "eth_getBalance",
        contractAddress: "",
        standardContractType: "",
        parameters: [":userAddress", "latest"],
        returnValueTest: { comparator: ">=", value: "1" },
      },
    ];

    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
      {
        authSig,
        chain: chain,
        dataToEncrypt: message,
        accessControlConditions,
      },
      this.litNodeClient
    );

    return {
      ciphertext,
      dataToEncryptHash,
      accessControlConditions,
    };
  }

  async decrypt(
    ciphertext: string,
    dataToEncryptHash: string,
    accessControlConditions: any
  ) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: chain,
      nonce: "",
    });

    console.log(authSig);

    const decryptedString = await LitJsSdk.decryptToString(
      {
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        authSig,
        chain: chain,
      },
      this.litNodeClient
    );
    return { decryptedString };
  }
}

const lit = new Lit();

export { lit, getAccessControlConditions };
