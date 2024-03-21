import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Okam",
  description: "Crypto marketplace for AI datasets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className && "flex flex-col min-h-screen"}>
          <header className="flex h-18 w-full px-16 items-center">
            <span className="text-lg font-bold text-green-500">OKAM</span>
          </header>

          <main className="w-full flex-grow px-16 py-8">
            {children}
          </main>

          <footer className="flex h-18 w-full px-16 items-center text-sm">
            <span className="text-green-500 font-semibold">OKAM</span>
            &nbsp;
            <span className="text-white font-medium">by WarpCode</span>
          </footer>
        </body>
      </Providers>
    </html>
  );
}
