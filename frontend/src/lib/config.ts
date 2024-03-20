import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
});

export const litConfig = {
  ethChain: "sepolia",
  litNetwork: "cayenne",
};