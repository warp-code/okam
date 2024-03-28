"use client";

import { State, WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/lib/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({
  children,
  initialState,
}: Readonly<{
  children: React.ReactNode;
  initialState: State | undefined;
}>) {
  return (
    <WagmiProvider initialState={initialState} config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
