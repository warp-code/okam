import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { SiweMessage } from "siwe";
import { ethers } from "ethers";

import dotenv from "dotenv";

dotenv.config();

type LitConfig = {
  ethChain: "sepolia";
  litNetwork: "cayenne";
  standardContractType: "";
  comparator: "=";
};

export type AuthSig = {
  sig: string;
  derivedVia: string;
  signedMessage: string;
  address: string;
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

class Lit {
  private litNodeClient: any;

  async connect() {
    await client.connect();
    this.litNodeClient = client;
  }

  async decryptForOwnershipToken(
    ciphertext: string,
    dataToEncryptHash: string,
    tokenId: string,
    authSig: AuthSig
  ) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const decryptedBytes = await LitJsSdk.decryptToFile(
      {
        evmContractConditions: getEvmContractConditions(tokenId),
        ciphertext,
        dataToEncryptHash,
        authSig,
        chain: chain,
      },
      this.litNodeClient
    ).catch((x) => {
      console.log(JSON.stringify(x));
      throw x;
    });

    return { decryptedBytes };
  }

  async getSignedMessage(wallet: ethers.HDNodeWallet) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    let nonce = this.litNodeClient.getLatestBlockhash();
    console.log("WALLET ADDRESS:", wallet.address);
    const address = wallet.address;

    const domain = "localhost";
    const origin = "http://localhost:3000/";
    const statement = "Okam is awesome.";
    const expirationTime = new Date(
      Date.now() + 1000 * 60 * 60 * 6
    ).toISOString(); //6 hours from now

    const siweMessage = new SiweMessage({
      domain,
      address: address,
      statement,
      uri: origin,
      version: "1",
      chainId: 11155111,
      nonce,
      expirationTime,
    });

    const messageToSign = siweMessage.prepareMessage();

    const signature = await wallet.signMessage(messageToSign);

    const authSig = {
      sig: signature,
      derivedVia: `web3.eth.personal.sign`,
      signedMessage: messageToSign,
      address: address,
    };

    return authSig;
  }
}

const lit = new Lit();

export { lit, getEvmContractConditions };
