"use client";

import { useRouter } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();

  return (
    <>
      <header className="flex h-18 w-full sm:px-16 px-8 items-center">
        <span
          className="text-lg font-bold text-green-500 cursor-pointer"
          onClick={() => push("/")}
        >
          OKAM
        </span>
      </header>

      <main className="w-full flex-grow sm:px-16 px-8 py-8">{children}</main>

      <footer className="flex h-18 w-full sm:px-16 px-8 items-center text-sm">
        <span className="text-green-500 font-semibold">OKAM</span>
        &nbsp;
        <span className="text-white font-medium">by WarpCode</span>
      </footer>
    </>
  );
}
