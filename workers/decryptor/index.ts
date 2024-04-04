import { ethers, Interface, Network, Wallet } from "ethers";
import dotenv from "dotenv";
import { accessTokenAbi } from "./accessTokenAbi";
import { lit } from "./lit";
import { Dataset, getOneByTokenId } from "./supabase";
import axios from "axios";
import fs from "fs";

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
      run(tokenId); // Call your run function once NFT is received
    }
  });
}

// Empty run function to be populated with actual logic
async function run(tokenId: BigInt) {
  // Populate this function with your logic
  console.log("NFT received. Running your logic...");

  const ownershipTokenId = await contract.getOwnershipTokenId(tokenId);
  console.log("ownership token id", (ownershipTokenId as BigInt).toString());

  const modelResp = await getOneByTokenId<Dataset>(
    "datasets",
    (ownershipTokenId as BigInt).toString()
  );

  const { data_to_encrypt_hash, file_cid } = modelResp.data;

  const fileResp = await axios.get(`https://nftstorage.link/ipfs/${file_cid}`);

  const fileContents = fileResp.data as string;

  console.log(fileContents);

  const { decryptedBytes } = await lit.decryptForOwnershipToken(
    fileContents,
    data_to_encrypt_hash,
    tokenId.toString()
  );

  fs.writeFileSync("./test.jpg", decryptedBytes);

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
