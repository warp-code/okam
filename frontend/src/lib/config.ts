import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      "https://sepolia.infura.io/v3/333b44e5477f41c192d8e22288a0434f"
    ),
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
