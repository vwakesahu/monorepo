import { Chain, http } from "viem";
import { Network } from "@/hooks/useNetworks";

export const NETWORK_CONFIG = {
  DEFAULT_NETWORK_NAME: "Sei Testnet",
} as const;

// Chain ID constants - only Morph Holesky
export const CHAIN_IDS = {
  SEI_TESTNET: 1328,
} as const;

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://stealth-lemon.vercel.app";

export const STEALTH_ADDRESS_GENERATION_MESSAGE =
  "STEALTH_ADDRESS_GENERATION_ZZZZZ_SEI_TESTNET";

export const WHITELISTED_NETWORKS = [
  {
    name: "Sei Testnet",
    chainId: CHAIN_IDS.SEI_TESTNET,
    network: "sei-testnet",
    explorerUrl: "https://seitrace.com",
    logo: "/sei-logo.svg",
    rpcUrl: "https://sei-testnet.drpc.org",
    nativeCurrency: {
      name: "SEI",
      symbol: "SEI",
      decimals: 18,
    },
    blockExplorer: {
      name: "Sei Explorer",
      url: "https://seitrace.com/",
    },
    tokens: [
      {
        symbol: "USDC",
        name: "USDC",
        address: "0x4fCF1784B31630811181f670Aea7A7bEF803eaED",
      },
    ],
    testnet: true,
  },
  // {
  //   name: "Morph Holesky",
  //   chainId: CHAIN_IDS.MORPH_HOLESKY,
  //   network: "Morph Holesky",
  //   explorerUrl: "https://explorer-holesky.morphl2.io",
  //   logo: "/morph-logo.svg",
  //   rpcUrl: "https://rpc-holesky.morphl2.io",
  //   nativeCurrency: {
  //     name: "Ethereum",
  //     symbol: "ETH",
  //     decimals: 18,
  //   },
  //   blockExplorer: {
  //     name: "morph scan",
  //     url: "https://explorer-holesky.morphl2.io/",
  //   },
  //   tokens: [
  //     {
  //       symbol: "USDT",
  //       name: "Tether",
  //       address: "0x4ddBE2281d190536C68DA0708153d4f757879ABa",
  //     },
  //   ],
  //   testnet: true,
  // },
];

// Transform function to convert WHITELISTED_NETWORKS to Privy Chain format
export const getPrivyChains = (networks: Network[]) => {
  return networks.map((network) => ({
    name: network.name,
    id: network.chainId,
    nativeCurrency: network.nativeCurrency,
    rpcUrls: {
      default: {
        http: [network.rpcUrl],
      },
    },
    blockExplorers: {
      default: {
        name: "Seistream",
        url: network.explorerUrl,
      },
    },
  }));
};

// Transform function to convert WHITELISTED_NETWORKS to Viem Chain format
export const getViemChains = (networks: Network[]): Chain[] => {
  return networks.map((network) => ({
    id: network.chainId,
    name: network.name,
    network: network.network,
    nativeCurrency: network.nativeCurrency,
    rpcUrls: {
      default: {
        http: [network.rpcUrl],
      },
    },
    blockExplorers: {
      default: {
        name: "Block Explorer",
        url: network.blockExplorer.url,
      },
    },
    testnet: network.testnet,
  }));
};

// Create dynamic RPC transports for all whitelisted networks
export const getViemTransports = (networks: Network[]) => {
  const transports: Record<number, ReturnType<typeof http>> = {};

  networks.forEach((network) => {
    transports[network.chainId] = http(network.rpcUrl);
  });

  return transports;
};

export const SITE = {
  name: "Unwallet",
  description: "One wallet for payments on any chain.",
  logo: "/logo.svg",
};

export const MULTICALL3_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";

export const MULTICALL3_ABI = [
  {
    inputs: [
      {
        components: [
          { name: "target", type: "address" },
          { name: "allowFailure", type: "bool" },
          { name: "callData", type: "bytes" },
        ],
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate3",
    outputs: [
      {
        components: [
          { name: "success", type: "bool" },
          { name: "returnData", type: "bytes" },
        ],
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

// Utility function to get the current network from a list of networks
export const getCurrentNetwork = (
  networks: Network[] | undefined
): Network | undefined => {
  if (!networks) return undefined;
  return networks.find(
    (network) => network.name === NETWORK_CONFIG.DEFAULT_NETWORK_NAME
  );
};

export const SAFE_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
      { name: "data", type: "bytes" },
      { name: "operation", type: "uint8" },
      { name: "safeTxGas", type: "uint256" },
      { name: "baseGas", type: "uint256" },
      { name: "gasPrice", type: "uint256" },
      { name: "gasToken", type: "address" },
      { name: "refundReceiver", type: "address" },
      { name: "signatures", type: "bytes" },
    ],
    name: "execTransaction",
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const USDC_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
