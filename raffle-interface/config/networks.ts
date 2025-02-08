export interface NetworkConfig {
    name: string;
    rpcUrl: string;
    wsUrl: string;
    chainId: number;
    contractAddress?: string;
    explorerUrl: string;
    symbol: string;
    blockTime: number;
  }

  export const NETWORKS: { [key: string]: NetworkConfig } = {
  "moonbase": {
    "name": "Moonbase Alpha",
    "rpcUrl": "https://rpc.api.moonbase.moonbeam.network",
    "wsUrl": "wss://wss.api.moonbase.moonbeam.network",
    "chainId": 1287,
    "contractAddress": "0xA61eA3f6199877FDE5552b58F464592d8AC3e2D3",
    "explorerUrl": "https://moonbase.moonscan.io",
    "symbol": "DEV",
    "blockTime": 6
  },
  "westend": {
    "name": "Asset Hub Westend",
    "rpcUrl": "https://westend-asset-hub-eth-rpc.polkadot.io",
    "wsUrl": "wss://westend-asset-hub-eth-rpc.polkadot.io",
    "chainId": 420420421,
    "explorerUrl": "https://westend-asset-hub-eth-explorer.parity.io",
    "symbol": "WND",
    "blockTime": 6
  }
};

  export const DEFAULT_NETWORK = "moonbase";
  