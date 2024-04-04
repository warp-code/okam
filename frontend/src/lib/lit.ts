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

function getAccessControlConditions(tokenId: string) {
  return [
    {
      chain: chain,
      method: "hasAccess",
      standardContractType: litConfig.standardContractType,
      contractAddress: process.env.NEXT_PUBLIC_ACCESS_CONTRACT_ADDRESS,
      parameters: [":userAddress", tokenId],
      returnValueTest: {
        comparator: litConfig.comparator,
        value: "true",
      },
      methodAbi: {
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
}

const lit = new Lit();

export { lit, getAccessControlConditions };
