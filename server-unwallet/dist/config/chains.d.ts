export declare const CHAIN_IDS: {
    readonly MORPH_HOLESKY: 2810;
};
export declare const MORPH_HOLESKY: {
    blockExplorers: {
        readonly default: {
            readonly name: "Morph Scan";
            readonly url: "https://explorer-holesky.morphl2.io";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts?: {
        [x: string]: import("viem").ChainContract | {
            [sourceId: number]: import("viem").ChainContract | undefined;
        } | undefined;
        ensRegistry?: import("viem").ChainContract | undefined;
        ensUniversalResolver?: import("viem").ChainContract | undefined;
        multicall3?: import("viem").ChainContract | undefined;
        universalSignatureVerifier?: import("viem").ChainContract | undefined;
    } | undefined;
    ensTlds?: readonly string[] | undefined;
    id: 2810;
    name: "Morph Holesky";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Ethereum";
        readonly symbol: "ETH";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-holesky.morphl2.io"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc-holesky.morphl2.io"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    readonly network: "morph-holesky";
};
export declare const DEFAULT_CHAIN: {
    blockExplorers: {
        readonly default: {
            readonly name: "Morph Scan";
            readonly url: "https://explorer-holesky.morphl2.io";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts?: {
        [x: string]: import("viem").ChainContract | {
            [sourceId: number]: import("viem").ChainContract | undefined;
        } | undefined;
        ensRegistry?: import("viem").ChainContract | undefined;
        ensUniversalResolver?: import("viem").ChainContract | undefined;
        multicall3?: import("viem").ChainContract | undefined;
        universalSignatureVerifier?: import("viem").ChainContract | undefined;
    } | undefined;
    ensTlds?: readonly string[] | undefined;
    id: 2810;
    name: "Morph Holesky";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Ethereum";
        readonly symbol: "ETH";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-holesky.morphl2.io"];
        };
        readonly public: {
            readonly http: readonly ["https://rpc-holesky.morphl2.io"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    readonly network: "morph-holesky";
};
export declare const DEFAULT_CHAIN_ID: 2810;
export declare const DEFAULT_RPC_URL: "https://rpc-holesky.morphl2.io";
export declare const SUPPORTED_CHAINS: 2810[];
export declare const CHAIN_NAMES: Record<number, string>;
export declare const RPC_URLS: Record<number, string>;
export declare const NATIVE_CURRENCIES: Record<number, {
    name: string;
    symbol: string;
    decimals: number;
}>;
//# sourceMappingURL=chains.d.ts.map