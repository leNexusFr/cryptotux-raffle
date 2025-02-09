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

// Fonction helper pour récupérer l'adresse du contrat
function getContractAddress(networkName: string, configuredAddress?: string): string {
  // Priorité à la variable d'environnement
  if (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
      return process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  }
  // Sinon utiliser l'adresse configurée
  return configuredAddress || '';
}

export const NETWORKS: { [key: string]: NetworkConfig } = {
  "moonbase": {
      "name": "Moonbase Alpha",
      "rpcUrl": "https://rpc.api.moonbase.moonbeam.network",
      "wsUrl": "wss://wss.api.moonbase.moonbeam.network",
      "chainId": 1287,
      "contractAddress": getContractAddress("moonbase", "0x8a636a81A62eE55E727Da5c08BAee5cbB1f6D4DE"),
      "explorerUrl": "https://moonbase.moonscan.io",
      "symbol": "DEV",
      "blockTime": 6
  },
  "westend": {
      "name": "Asset Hub Westend",
      "rpcUrl": "https://westend-asset-hub-eth-rpc.polkadot.io",
      "wsUrl": "wss://westend-asset-hub-eth-rpc.polkadot.io",
      "chainId": 420420421,
      "contractAddress": getContractAddress("westend", ""),
      "explorerUrl": "https://westend-asset-hub-eth-explorer.parity.io",
      "symbol": "WND",
      "blockTime": 6
  }
};

export const DEFAULT_NETWORK = "moonbase";