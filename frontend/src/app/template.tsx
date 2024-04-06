"use client";

import Logo from "@/app/_components/Logo";
import { useRouter } from "next/navigation";
import { useConnect, useAccount, useDisconnect } from "wagmi";

export default function Template({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();

  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  return (
    <>
      <header className="flex h-18 w-full sm:px-16 px-8 gap-4 items-center justify-between">
        <div className="flex flex-row gap-2">
          <span className="h-6 w-6 my-auto">
            <Logo />
          </span>
          <span
            className="text-lg font-bold text-green-500 cursor-pointer"
            onClick={() => push("/")}
          >
            OKAM
          </span>
        </div>

        <span className="flex flex-row gap-4 items-center">
          {isConnected ? (
            <>
              <button
                type="button"
                className="btn btn-md btn-secondary"
                onClick={() => push("/create")}
              >
                Create
              </button>

              <button
                type="button"
                className="btn btn-md btn-secondary"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>

              <span className="flex items-center gap-2">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="40" height="40" rx="20" fill="#1C2120" />
                  <g opacity="0.08">
                    <rect
                      x="0.375"
                      y="0.375"
                      width="39.25"
                      height="39.25"
                      rx="19.625"
                      stroke="#101828"
                      strokeWidth="0.75"
                    />
                  </g>
                  <path
                    d="M28 29C28 27.6044 28 26.9067 27.8278 26.3389C27.44 25.0605 26.4395 24.06 25.1611 23.6722C24.5933 23.5 23.8956 23.5 22.5 23.5H17.5C16.1044 23.5 15.4067 23.5 14.8389 23.6722C13.5605 24.06 12.56 25.0605 12.1722 26.3389C12 26.9067 12 27.6044 12 29M24.5 15.5C24.5 17.9853 22.4853 20 20 20C17.5147 20 15.5 17.9853 15.5 15.5C15.5 13.0147 17.5147 11 20 11C22.4853 11 24.5 13.0147 24.5 15.5Z"
                    stroke="#5FE9D0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-md btn-secondary"
              onClick={() => connect({ connector: connectors[0] })}
            >
              Connect wallet
            </button>
          )}
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
