import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { sepolia, anvil } from "wagmi/chains";
import { injected } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [anvil, sepolia],
  transports: {
    [anvil.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [injected({ shimDisconnect: true })],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export const litConfig = {
  ethChain: "sepolia",
  litNetwork: "cayenne",
};