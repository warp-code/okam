declare global {
  interface Window {
    ethereum: any;
  }
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_W3C_PID: string;
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
      NFT_STORAGE_API_KEY: string;
      NEXT_PUBLIC_OWNERSHIP_CONTRACT_ADDRESS: `0x${string}`;
      NEXT_PUBLIC_USAGE_CONTRACT_ADDRESS: `0x${string}`;
      NEXT_PUBLIC_ACCESS_CONTRACT_ADDRESS: `0x${string}`;
    }
  }
}

export {};
