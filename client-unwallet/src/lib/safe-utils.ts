import { createPublicClient, http } from "viem";
import Safe from "@safe-global/protocol-kit";
import { CHAIN_IDS } from "./constants";
import { getContractNetworks } from "./safe-contracts";

// Create public client for reading blockchain data
export const publicClient = createPublicClient({
  chain: {
    id: CHAIN_IDS.SEI_TESTNET,
    name: "Sei Testnet",
    nativeCurrency: { name: "SEI", symbol: "SEI", decimals: 18 },
    rpcUrls: { default: { http: ["https://sei-testnet.drpc.org"] } },
    testnet: true,
  },
  transport: http("https://sei-testnet.drpc.org"),
});

// Helper function to build Safe transaction
export const buildSafeTransaction = (txData: {
  to: string;
  value?: string;
  data?: string;
  operation?: number;
  safeTxGas?: string;
  baseGas?: string;
  gasPrice?: string;
  gasToken?: string;
  refundReceiver?: string;
  nonce?: number;
}) => {
  return {
    to: txData.to,
    value: txData.value || "0",
    data: txData.data || "0x",
    operation: txData.operation || 0,
    safeTxGas: txData.safeTxGas || "0",
    baseGas: txData.baseGas || "0",
    gasPrice: txData.gasPrice || "0",
    gasToken: txData.gasToken || "0x0000000000000000000000000000000000000000",
    refundReceiver:
      txData.refundReceiver || "0x0000000000000000000000000000000000000000",
    nonce: txData.nonce || 0,
  };
};

// Helper function to sign typed data
export const safeSignTypedData = async (
  walletClient: {
    signTypedData: (params: {
      account: { address: string };
      domain: { chainId: number; verifyingContract: string };
      types: Record<string, Array<{ type: string; name: string }>>;
      primaryType: string;
      message: Record<string, string | number>;
    }) => Promise<string>;
  },
  account: { address: string },
  safeAddress: string,
  safeTx: {
    to: string;
    value: string;
    data: string;
    operation: number;
    safeTxGas: string;
    baseGas: string;
    gasPrice: string;
    gasToken: string;
    refundReceiver: string;
    nonce: number;
  },
  chainId: number = CHAIN_IDS.SEI_TESTNET
) => {
  const domain = {
    chainId: chainId,
    verifyingContract: safeAddress,
  };

  const types = {
    SafeTx: [
      { type: "address", name: "to" },
      { type: "uint256", name: "value" },
      { type: "bytes", name: "data" },
      { type: "uint8", name: "operation" },
      { type: "uint256", name: "safeTxGas" },
      { type: "uint256", name: "baseGas" },
      { type: "uint256", name: "gasPrice" },
      { type: "address", name: "gasToken" },
      { type: "address", name: "refundReceiver" },
      { type: "uint256", name: "nonce" },
    ],
  };

  const message = {
    to: safeTx.to,
    value: safeTx.value.toString(),
    data: safeTx.data,
    operation: safeTx.operation,
    safeTxGas: safeTx.safeTxGas.toString(),
    baseGas: safeTx.baseGas.toString(),
    gasPrice: safeTx.gasPrice.toString(),
    gasToken: safeTx.gasToken,
    refundReceiver: safeTx.refundReceiver,
    nonce: Number(safeTx.nonce),
  };

  return await walletClient.signTypedData({
    account,
    domain,
    types,
    primaryType: "SafeTx",
    message,
  });
};

// Predict safe address based on stealth address
export async function predictSafeAddress(
  stealthAddress: string,
  rpcUrl: string = "https://sei-testnet.drpc.org"
) {
  try {
    console.log(
      "🔍 Predicting Safe address using Protocol Kit for:",
      stealthAddress
    );

    // Use Safe Protocol Kit's built-in prediction with custom contract addresses for Sei Testnet
    const predictedSafe = {
      safeAccountConfig: {
        owners: [stealthAddress],
        threshold: 1,
      },
      safeDeploymentConfig: {
        saltNonce: "0",
      },
    };

    // Get custom contract networks configuration for Sei Testnet
    const contractNetworks = getContractNetworks(CHAIN_IDS.SEI_TESTNET);

    console.log(
      "🔧 Using custom contract networks for Sei Testnet:",
      contractNetworks
    );

    // Safe Protocol Kit with custom contract addresses for Sei Testnet
    const protocolKit = await Safe.init({
      provider: rpcUrl,
      predictedSafe,
      contractNetworks,
    });

    const predictedAddress = await protocolKit.getAddress();
    console.log("✅ Safe address predicted successfully:", predictedAddress);

    return predictedAddress;
  } catch (error) {
    console.error("❌ Error predicting safe address:", error);
    throw error;
  }
}
