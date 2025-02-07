import { exec } from 'child_process';
import { promisify } from 'util';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { NETWORKS } from '../../config/networks';

const execAsync = promisify(exec);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Récupérer le réseau depuis la requête ou utiliser le défaut
  const networkName = (req.body.network as string) || 'moonbase';
  const network = NETWORKS[networkName];

  if (!network) {
    return res.status(400).json({ 
      error: 'Réseau non supporté',
      details: `Le réseau ${networkName} n'est pas configuré`
    });
  }

  try {
    // Chemin vers le dossier moonbeam-raffle
    const projectRoot = path.join(process.cwd(), '..', 'moonbeam-raffle');
    const hardhatConfigPath = path.join(projectRoot, 'hardhat.config.ts');

    // Vérifier si le fichier hardhat.config.ts existe
    if (!fs.existsSync(hardhatConfigPath)) {
      console.error('hardhat.config.ts not found at:', hardhatConfigPath);
      return res.status(500).json({ 
        error: 'Configuration Hardhat introuvable',
        details: `Chemin attendu: ${hardhatConfigPath}`
      });
    }

    console.log(`\n🌐 Exécution sur ${network.name}...`);
    console.log('   Directory:', projectRoot);
    console.log('   Config:', hardhatConfigPath);

    // Exécuter la commande dans le bon dossier avec le réseau spécifié
    const command = `cd "${projectRoot}" && NETWORK=${networkName} NODE_ENV=production npx hardhat run scripts/interact.ts --network ${networkName}`;
    console.log('\n📝 Commande:', command);

    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.error('\n⚠️ Script stderr:', stderr);
    }
    
    console.log('\n📤 Script stdout:', stdout);

    // Analyser la sortie pour des informations supplémentaires
    const txHash = stdout.match(/Transaction envoyée: (0x[a-fA-F0-9]{64})/)?.[1];
    const winners = stdout.match(/Code: (301-\d+)/g)?.map(match => match.replace('Code: ', ''));

    return res.status(200).json({ 
      success: true,
      network: network.name,
      output: stdout,
      details: {
        transactionHash: txHash,
        explorerUrl: txHash ? `${network.explorerUrl}/tx/${txHash}` : undefined,
        winners: winners
      }
    });

  } catch (error: any) {
    console.error('\n❌ API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to execute drawing',
      network: network.name,
      details: error.message,
      stack: error.stack,
      path: process.cwd()
    });
  }
}