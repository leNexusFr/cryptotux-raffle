import { WebSocketProvider, Wallet, Contract } from 'ethers';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NETWORKS, DEFAULT_NETWORK } from '../../config/networks';

// Récupérer la configuration du réseau
const network = NETWORKS[DEFAULT_NETWORK];

if (!network || !network.contractAddress) {
  throw new Error(`Network configuration invalid`);
}

const RAFFLE_ABI = [
  "function isDrawingComplete() view returns (bool)",
  "function targetBlock() view returns (uint256)",
  "function getWinnerIds() view returns (uint256[3])",
  "function requestDrawing() external"
];

// Clé secrète pour sécuriser l'API
const API_SECRET = process.env.API_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérifier la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vérifier le secret d'API
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let wsProvider: WebSocketProvider | null = null;

  try {
    wsProvider = new WebSocketProvider(network.wsUrl);
    const contract = new Contract(network.contractAddress as string, RAFFLE_ABI, wsProvider);

    // Vérifier si le tirage peut être exécuté
    const [currentBlock, targetBlock, isComplete] = await Promise.all([
      wsProvider.getBlockNumber(),
      contract.targetBlock(),
      contract.isDrawingComplete()
    ]);

    if (isComplete) {
      return res.status(400).json({ error: 'Drawing already completed' });
    }

    if (currentBlock < Number(targetBlock)) {
      return res.status(400).json({ error: 'Too early for drawing' });
    }

    // Rediriger vers l'API de trigger-drawing pour l'exécution
    const triggerResponse = await fetch('/api/trigger-drawing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_SECRET}`
      },
      body: JSON.stringify({ network: DEFAULT_NETWORK })
    });

    const result = await triggerResponse.json();

    if (!triggerResponse.ok) {
      throw new Error(result.error || 'Failed to trigger drawing');
    }

    return res.status(200).json(result);

  } catch (error: any) {
    console.error('Error executing drawing:', error);
    return res.status(500).json({ 
      error: 'Failed to execute drawing',
      details: error.message 
    });
  } finally {
    if (wsProvider) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        await wsProvider.destroy();
      } catch (error) {
        console.log("WebSocket connection closed");
      }
    }
  }
}