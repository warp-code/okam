import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers/Providers";
import "./globals.css";

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
  return (
    <html lang="en">
      <Providers>
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
