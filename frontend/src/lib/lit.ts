import * as LitJsSdk from "@lit-protocol/lit-node-client";

type LitConfig = {
  ethChain: "sepolia";
  litNetwork: "cayenne";
  standardContractType: "";
  comparator: "=";
};

const litConfig: LitConfig = {
  ethChain: "sepolia",
  litNetwork: "cayenne",
  standardContractType: "",
  comparator: "=",
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

export async function encryptForOwnershipToken(
  formData: FormData,
  tokenId: string
) {
  const penis = await client.connect();

  const authSig = await LitJsSdk.checkAndSignAuthMessage({
    chain: chain,
    nonce: "",
  });

  const accessControlConditions = getEvmContractConditions(tokenId);

  const file = formData.get("file") as File;

  const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptFile(
    {
      authSig: authSig,
      chain: chain,
      file: file,
      evmContractConditions: accessControlConditions,
    },
    penis as any
  );

  return {
    ciphertext,
    dataToEncryptHash,
    accessControlConditions,
  };
}

class Lit {
  private litNodeClient: any;

  async connect() {
    await client.connect();
    this.litNodeClient = client;
  }

  async encryptForOwnershipToken(formData: FormData, tokenId: string) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: chain,
      nonce: "",
    });

    const accessControlConditions = getEvmContractConditions(tokenId);

    const file = formData.get("file") as File;

    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptFile(
      {
        authSig: authSig,
        chain: chain,
        file: file,
        evmContractConditions: accessControlConditions,
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
        evmContractConditions: getEvmContractConditions(tokenId),
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

export { lit, getEvmContractConditions };
