import NftStorageExample from './_examples/NftStorageExample';
import LitExample from "./_examples/LitExample";
import WagmiExample from "./_examples/WagmiExample";

export default function Home() {
  const nftStorageApiKey = process.env.NFT_STORAGE_API_KEY;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <WagmiExample></WagmiExample>
        <LitExample></LitExample>
        <NftStorageExample token={nftStorageApiKey}></NftStorageExample>
      </div>
    </main>
  );
}
