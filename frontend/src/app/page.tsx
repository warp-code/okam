import LitExample from "./_examples/LitExample";
import WagmiExample from "./_examples/WagmiExample";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <WagmiExample></WagmiExample>
        <LitExample></LitExample>
      </div>
    </main>
  );
}
