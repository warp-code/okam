import { ethChain, litNetwork } from "@/constants";
import * as LitJsSdk from "@lit-protocol/lit-node-client";

const client = new LitJsSdk.LitNodeClient({
  litNetwork: litNetwork,
});
const chain = ethChain;

class Lit {
  private litNodeClient: any;

  async connect() {
    await client.connect();
    this.litNodeClient = client;
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
      accessControlConditions
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

export default new Lit();
