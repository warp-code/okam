import * as LitJsSdk from "@lit-protocol/lit-node-client";

type LitConfig = {
  ethChain: "sepolia",
  litNetwork: "cayenne",
  standardContractType: "",
  comparator: "="
}

const litConfig: LitConfig = {
  ethChain: "sepolia",
  litNetwork: "cayenne",
  standardContractType: "",
  comparator: "="
};

const client = new LitJsSdk.LitNodeClient({
  litNetwork: litConfig.litNetwork,
});

const chain = litConfig.ethChain;

function getEvmContractConditions(tokenId: string) {
  return [
    {
      chain: chain,
      functionName: "hasAccess",
      contractAddress: process.env.NEXT_PUBLIC_ACCESS_CONTRACT_ADDRESS,
      functionParams: [":userAddress", tokenId],
      returnValueTest: {
        key: "",
        comparator: litConfig.comparator,
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

  async encryptForOwnershipToken(file: Blob, tokenId: string) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: chain,
      nonce: "",
    });

    const accessControlConditions = getEvmContractConditions(tokenId);

    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptFile(
      {
        authSig: authSig,
        chain: chain,
        file: file,
        evmContractConditions: accessControlConditions
      },
      this.litNodeClient
    );

    return {
      ciphertext,
      dataToEncryptHash,
      accessControlConditions,
    };
  }
}

const lit = new Lit();

export { lit, getEvmContractConditions };
