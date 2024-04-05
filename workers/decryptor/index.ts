import { ethers, Interface, Network, Wallet } from "ethers";
import dotenv from "dotenv";
import { accessTokenAbi } from "./accessTokenAbi";
import { lit } from "./lit";
import { Dataset, getOneByTokenId } from "./supabase";
import axios from "axios";
import fs from "fs";
import decompress from "decompress";
import https from "https";
import path from "path";
import { finished } from "stream/promises";
import { Readable } from "stream";

// Load environment variables from .env file
dotenv.config();

// Function to generate a new Ethereum wallet
async function generateWallet(): Promise<ethers.HDNodeWallet> {
  const wallet = ethers.Wallet.createRandom();
  console.log("New wallet created:");
  console.log("Address:", wallet.address);
  console.log("Private Key:", wallet.privateKey);
  return wallet;
}

const contractAddress = process.env.CONTRACT_ADDRESS;

const network = new ethers.Network("sepolia", 11155111);
const provider = new ethers.JsonRpcProvider(
  process.env.RPC_PROVIDER_URL,
  network,
  { polling: true, pollingInterval: 5000 }
);

const iface = new Interface(accessTokenAbi);
const contract = new ethers.Contract(contractAddress, iface, provider);

// Function to wait for an NFT to be minted to the given wallet address
async function waitForNFTMint(wallet: ethers.HDNodeWallet): Promise<void> {
  console.log(process.env.RPC_PROVIDER_URL);

  console.log("Waiting for NFT mint...");

  contract.on("Transfer", (from, to, tokenId) => {
    console.log("Found transfer event to:", to);
    if (to === wallet.address) {
      console.log("NFT minted to your wallet!");
      run(tokenId, wallet); // Call your run function once NFT is received
    }
  });
}
function downloadFile(url, filePath) {
  return new Promise((resolve) => {
    const writer = fs.createWriteStream(filePath);

    axios({
      method: "get",
      url: url,
      responseType: "stream",
    }).then((response) => {
      response.data.pipe(writer);
    });
    writer.on("finish", () => {
      console.log("File downloaded successfully.");
      resolve(null);
    });
    writer.on("error", (err) => {
      console.error(err);
    });
  });
}
// async function downloadFile(url, filePath) {
//   return new Promise((resolve, reject) => {
//       const file = fs.createWriteStream(filePath);
//       const request = https.get(url, function(response) {
//         response.pipe(file);
//         response.on("end", () => {
//           resolve(null);
//         });
//       })
//   });
// }

// Empty run function to be populated with actual logic
async function run(tokenId: BigInt, wallet: ethers.HDNodeWallet) {
  // Populate this function with your logic
  const ownershipTokenId = await contract.getOwnershipTokenId(tokenId);
  console.log("Ownership token id:", (ownershipTokenId as BigInt).toString());
  const usageTokenId = await contract.getUsageTokenId(tokenId);
  console.log("Usage token id:", (usageTokenId as BigInt).toString());

  const modelResp = await getOneByTokenId<Dataset>(
    "datasets",
    (ownershipTokenId as BigInt).toString()
  );

  const { data_to_encrypt_hash, file_cid } = modelResp.data;
  // const fileResp = await axios.get(`https://nftstorage.link/ipfs/${file_cid}`, {
  //   responseType: "arraybuffer",
  // });

  if (fs.existsSync("./test.zip")) {
    fs.rmSync("./test.zip");
  }

  await downloadFile(`https://nftstorage.link/ipfs/${file_cid}`, "test.zip");

  console.log("downloaded zipped model, decompressing...");

  if (fs.existsSync("../.model")) {
    fs.rmSync("../.model", { recursive: true });
  }

  await decompress("./test.zip", "../.model");

  console.log("Saved model to ./.model/");
  console.log("Cleaning up...");

  if (fs.existsSync("./test.zip")) {
    fs.rmSync("./test.zip");
  }


  // const fileContents = Buffer.from(fileResp.data, 'binary').toString("base64");

  // console.log(fileContents);

  // const { decryptedBytes } = await lit.decryptForOwnershipToken(
  //   fileContents,
  //   data_to_encrypt_hash,
  //   usageTokenId.toString(),
  //   await lit.getSignedMessage(wallet)
  // );

  process.exit(0);
}

// Main function to generate wallet and wait for NFT mint
async function main() {
  const wallet = await generateWallet();

  console.log("Contract address:", contractAddress);

  if (!contractAddress) {
    throw new Error("CONTRACT_ADDRESS environment variable is not set.");
  }
  await waitForNFTMint(wallet);
}

// Run the main function
main().catch((error) => console.error(error));
