import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "@/providers/Providers";
import "./globals.css";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { wagmiConfig } from "@/lib/config";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  preload: true,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
          className={`${poppins.className} antialiased flex flex-col min-h-screen`}
          suppressHydrationWarning={true}
        >
          <SpeedInsights />
          {children}
        </body>
      </Providers>
    </html>
  );
}
