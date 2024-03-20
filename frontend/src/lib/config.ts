import { http, createConfig } from "wagmi";
import { sepolia, localhost } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [sepolia, localhost],
  transports: {
    [sepolia.id]: http(),
    [localhost.id]: http(),
  },
  ssr: true,
});

export const litConfig = {
  ethChain: "sepolia",
  litNetwork: "cayenne",
};
