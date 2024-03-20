declare global {
  interface Window {
    ethereum: any;
  }
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_W3C_PID: string;
      NFT_STORAGE_API_KEY: string;
    }
  }
}

export { };
