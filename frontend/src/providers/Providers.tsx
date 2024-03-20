"use client";

import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/lib/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
