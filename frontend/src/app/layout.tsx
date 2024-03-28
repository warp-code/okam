import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers/Providers";
import "./globals.css";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { wagmiConfig } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OKAM.ai",
  description: "An open platform for private AI models",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  );

  return (
    <html lang="en">
      <Providers initialState={initialState}>
        <body
          className={inter.className && "flex flex-col min-h-screen"}
          suppressHydrationWarning={true}
        >
          {children}
        </body>
      </Providers>
    </html>
  );
}
