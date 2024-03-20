import { http, createConfig } from "wagmi";
import { sepolia, anvil } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [anvil, sepolia],
  transports: {
    [anvil.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
});

export const litConfig = {
  ethChain: "sepolia",
  litNetwork: "cayenne",
};