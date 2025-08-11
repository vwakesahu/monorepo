import { defineChain } from "viem";

// Chain ID constants - only Morph Holesky
export const CHAIN_IDS = {
  MORPH_HOLESKY: 2810,
} as const;

// Define Morph Holesky testnet chain
export const MORPH_HOLESKY = defineChain({
  id: CHAIN_IDS.MORPH_HOLESKY,
  name: 'Morph Holesky',
  network: 'morph-holesky',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-holesky.morphl2.io'],
    },
    public: {
      http: ['https://rpc-holesky.morphl2.io'],
    },
  },
  blockExplorers: {
    default: { 
      name: 'Morph Scan', 
      url: 'https://explorer-holesky.morphl2.io' 
    },
  },
  testnet: true,
});

// Default chain configuration
export const DEFAULT_CHAIN = MORPH_HOLESKY;
export const DEFAULT_CHAIN_ID = DEFAULT_CHAIN.id;
export const DEFAULT_RPC_URL = DEFAULT_CHAIN.rpcUrls.default.http[0];

// Supported chains array - only Morph Holesky
export const SUPPORTED_CHAINS = [CHAIN_IDS.MORPH_HOLESKY];

// Chain name mapping - only Morph Holesky
export const CHAIN_NAMES: Record<number, string> = {
  [CHAIN_IDS.MORPH_HOLESKY]: 'Morph Holesky',
};

// RPC URL mapping - only Morph Holesky
export const RPC_URLS: Record<number, string> = {
  [CHAIN_IDS.MORPH_HOLESKY]: 'https://rpc-holesky.morphl2.io',
};

// Native currency mapping - only Morph Holesky
export const NATIVE_CURRENCIES: Record<number, { name: string; symbol: string; decimals: number }> = {
  [CHAIN_IDS.MORPH_HOLESKY]: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
};
