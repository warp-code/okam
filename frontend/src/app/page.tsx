import WriteContract from "./_examples/CallContract";
import LitExample from "./_examples/LitExample";
import ReadContract from "./_examples/ReadContract";
import WagmiExample from "./_examples/WagmiExample";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <WagmiExample></WagmiExample>
        <ReadContract></ReadContract>
        <WriteContract></WriteContract>
        <LitExample></LitExample>
      </div>
    </main>
  );
}
