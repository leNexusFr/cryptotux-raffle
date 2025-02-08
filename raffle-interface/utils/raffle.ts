import { WebSocketProvider, Wallet, Contract } from 'ethers';
import { NETWORKS } from '../config/networks';

const RAFFLE_ABI = [
  "function requestDrawing(bytes32 reveal) external",
  "function isDrawingComplete() view returns (bool)",
  "function targetBlock() view returns (uint256)",
  "function getWinnerIds() view returns (uint256[3])",
  "function authorizedDrawers(address) view returns (bool)"
];

// Fonction pour attendre avec un délai
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fonction pour créer un provider avec retry
async function createProvider(wsUrl: string, maxRetries = 3): Promise<WebSocketProvider> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const provider = new WebSocketProvider(wsUrl);
      await provider.ready;
      return provider;
    } catch (error: any) {
      if (i === maxRetries - 1) throw error;
      console.log(`\n⚠️ Connection attempt failed, retrying in 2 seconds...`);
      await delay(2000);
    }
  }
  throw new Error("Could not connect to WebSocket after multiple attempts");
}

export async function executeDrawing(networkName: string) {
  const network = NETWORKS[networkName];
  if (!network?.contractAddress) {
    throw new Error(`Network ${networkName} not configured properly`);
  }

  let wsProvider: WebSocketProvider | null = null;

  try {
    wsProvider = await createProvider(network.wsUrl);
    const wallet = new Wallet(process.env.PRIVATE_KEY || '', wsProvider);
    const raffle = new Contract(network.contractAddress, RAFFLE_ABI, wallet);

    // Vérifier l'autorisation
    const isAuthorized = await raffle.authorizedDrawers(wallet.address);
    if (!isAuthorized) {
      throw new Error(`Address ${wallet.address} not authorized`);
    }

    // Vérifier si le tirage est déjà terminé
    const isComplete = await raffle.isDrawingComplete();
    if (isComplete) {
      const winners = await raffle.getWinnerIds();
      return {
        status: 'complete',
        winners: winners.map((id: bigint) => `301-${id.toString()}`),
      };
    }

    // Vérifier le timing du tirage
    const [currentBlock, targetBlock] = await Promise.all([
      wsProvider.getBlockNumber(),
      raffle.targetBlock()
    ]);

    if (currentBlock < Number(targetBlock)) {
      return {
        status: 'early',
        currentBlock,
        targetBlock: Number(targetBlock),
        remaining: Number(targetBlock) - currentBlock,
        estimatedMinutes: Math.round((Number(targetBlock) - currentBlock) * network.blockTime / 60)
      };
    }

    // Exécuter le tirage
    const reveal = process.env.REVEAL_VALUE;
    if (!reveal) {
      throw new Error('REVEAL_VALUE not configured');
    }

    console.log("\n🎲 Executing drawing...");
    console.log(`   Network: ${network.name}`);
    console.log(`   Contract: ${network.contractAddress}`);
    console.log(`   Caller: ${wallet.address}`);

    const tx = await raffle.requestDrawing(reveal);
    console.log(`\n📤 Transaction sent: ${tx.hash}`);
    
    const receipt = await tx.wait();
    console.log(`\n✅ Drawing executed successfully!`);

    // Attendre et récupérer les gagnants
    await delay(2000);
    const winners = await raffle.getWinnerIds();

    return {
      status: 'success',
      transactionHash: tx.hash,
      blockNumber: receipt.blockNumber,
      winners: winners.map((id: bigint) => `301-${id.toString()}`),
      explorerUrl: `${network.explorerUrl}/tx/${tx.hash}`
    };

  } catch (error: any) {
    console.error("\n❌ Error during execution:", error);
    throw error;
  } finally {
    if (wsProvider) {
      await wsProvider.destroy();
    }
  }
}