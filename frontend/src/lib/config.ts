import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { sepolia, anvil } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [anvil, sepolia],
  transports: {
    [anvil.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export const litConfig = {
  ethChain: "sepolia",
  litNetwork: "cayenne",
};