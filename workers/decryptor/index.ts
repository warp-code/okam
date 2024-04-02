import { ethers, Interface, Network, Wallet } from "ethers";
import dotenv from "dotenv";
import { abi } from "./abi"

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

// Function to wait for an NFT to be minted to the given wallet address
async function waitForNFTMint(
  wallet: ethers.HDNodeWallet,
  contractAddress: string
): Promise<void> {
  console.log(process.env.RPC_PROVIDER_URL);
  const network = new ethers.Network("anvil", 31337);
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_PROVIDER_URL,
    network,
    { polling: true, pollingInterval: 4000 }
  );
  const iface = new Interface(abi);
  const contract = new ethers.Contract(
    contractAddress,
    iface,
    provider
  );

  console.log("Waiting for NFT mint...");

  contract.on("Transfer", (from, to, tokenId) => {
    console.log("Found transfer event to:", to);
    if (to === wallet.address) {
      console.log("NFT minted to your wallet!");
      run(); // Call your run function once NFT is received
    }
  });
}

// Empty run function to be populated with actual logic
function run() {
  // Populate this function with your logic
  console.log("NFT received. Running your logic...");
  console.log("Bepis");
}

// Main function to generate wallet and wait for NFT mint
async function main() {
  const wallet = await generateWallet();
  const contractAddress = process.env.CONTRACT_ADDRESS;
  console.log(contractAddress);
  if (!contractAddress) {
    throw new Error("CONTRACT_ADDRESS environment variable is not set.");
  }
  await waitForNFTMint(wallet, contractAddress);
}

// Run the main function
main().catch((error) => console.error(error));
