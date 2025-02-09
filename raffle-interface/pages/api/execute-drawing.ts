import type { NextApiRequest, NextApiResponse } from 'next';
import { executeDrawing } from '../../utils/raffle';
import { NETWORKS, DEFAULT_NETWORK } from '../../config/networks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vérifier le secret d'API
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const networkName = (req.body.network as string) || DEFAULT_NETWORK;
  const network = NETWORKS[networkName];

  if (!network) {
    return res.status(400).json({ 
      error: 'Réseau non supporté',
      details: `Le réseau ${networkName} n'est pas configuré`
    });
  }

  try {
    const result = await executeDrawing(networkName);
    return res.status(200).json({ 
      success: true,
      network: network.name,
      ...result
    });

  } catch (error: unknown) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to execute drawing',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}