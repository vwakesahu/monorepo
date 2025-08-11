"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NATIVE_CURRENCIES = exports.RPC_URLS = exports.CHAIN_NAMES = exports.SUPPORTED_CHAINS = exports.DEFAULT_RPC_URL = exports.DEFAULT_CHAIN_ID = exports.DEFAULT_CHAIN = exports.MORPH_HOLESKY = exports.CHAIN_IDS = void 0;
const viem_1 = require("viem");
// Chain ID constants - only Morph Holesky
exports.CHAIN_IDS = {
    MORPH_HOLESKY: 2810,
};
// Define Morph Holesky testnet chain
exports.MORPH_HOLESKY = (0, viem_1.defineChain)({
    id: exports.CHAIN_IDS.MORPH_HOLESKY,
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
exports.DEFAULT_CHAIN = exports.MORPH_HOLESKY;
exports.DEFAULT_CHAIN_ID = exports.DEFAULT_CHAIN.id;
exports.DEFAULT_RPC_URL = exports.DEFAULT_CHAIN.rpcUrls.default.http[0];
// Supported chains array - only Morph Holesky
exports.SUPPORTED_CHAINS = [exports.CHAIN_IDS.MORPH_HOLESKY];
// Chain name mapping - only Morph Holesky
exports.CHAIN_NAMES = {
    [exports.CHAIN_IDS.MORPH_HOLESKY]: 'Morph Holesky',
};
// RPC URL mapping - only Morph Holesky
exports.RPC_URLS = {
    [exports.CHAIN_IDS.MORPH_HOLESKY]: 'https://rpc-holesky.morphl2.io',
};
// Native currency mapping - only Morph Holesky
exports.NATIVE_CURRENCIES = {
    [exports.CHAIN_IDS.MORPH_HOLESKY]: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
};
//# sourceMappingURL=chains.js.map