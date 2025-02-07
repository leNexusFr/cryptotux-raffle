import { WebSocketProvider, Wallet, Contract } from 'ethers';
import * as dotenv from 'dotenv';
import { NETWORKS } from "../../raffle-interface/config/networks";
import fs from 'fs';
import path from 'path';

dotenv.config();

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
      // Attendre que la connexion soit établie
      await provider.ready;
      return provider;
    } catch (error: any) {
      if (i === maxRetries - 1) throw error;
      console.log(`\n⚠️ Tentative de connexion échouée, nouvelle tentative dans 2 secondes...`);
      await delay(2000); // Attendre 2 secondes avant de réessayer
    }
  }
  throw new Error("Impossible de se connecter au WebSocket après plusieurs tentatives");
}

async function main() {
  // Récupérer le réseau depuis les arguments ou utiliser le défaut
  const networkName = process.env.NETWORK || "moonbase";
  const network = NETWORKS[networkName];
  
  if (!network) {
    throw new Error(`Réseau ${networkName} non configuré`);
  }

  if (!network.contractAddress) {
    throw new Error(`Adresse du contrat non configurée pour ${network.name}`);
  }

  // Lire la valeur reveal depuis le fichier
  const revealPath = path.join(__dirname, "../.reveal");
  if (!fs.existsSync(revealPath)) {
    throw new Error("Fichier .reveal non trouvé");
  }
  const revealHex = fs.readFileSync(revealPath, 'utf8');
  const reveal = `0x${revealHex}`;

  console.log(`\n🌐 Connexion au réseau ${network.name}...`);
  console.log(`   WebSocket: ${network.wsUrl}`);
  console.log(`   Contrat: ${network.contractAddress}`);
  
  let wsProvider: WebSocketProvider | null = null;
  
  try {
    wsProvider = await createProvider(network.wsUrl);
    const wallet = new Wallet(process.env.PRIVATE_KEY || '', wsProvider);
    const raffle = new Contract(network.contractAddress, RAFFLE_ABI, wallet);

    // Vérifier l'autorisation
    const isAuthorized = await raffle.authorizedDrawers(wallet.address);
    if (!isAuthorized) {
      throw new Error(`L'adresse ${wallet.address} n'est pas autorisée à effectuer le tirage`);
    }

    // Vérifier si le tirage est déjà terminé
    const isComplete = await raffle.isDrawingComplete();
    if (isComplete) {
      console.log("\n⚠️ Le tirage est déjà terminé!");
      
      // Afficher les gagnants si disponibles
      try {
        const winners = await raffle.getWinnerIds();
        console.log("\n🏆 Gagnants:");
        winners.forEach((id: bigint, index: number) => {
          console.log(`   ${index + 1}. Code: 301-${id.toString()}`);
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des gagnants:", error);
      }
      return;
    }

    // Vérifier si c'est le bon moment pour le tirage
    const [currentBlock, targetBlock] = await Promise.all([
      wsProvider.getBlockNumber(),
      raffle.targetBlock()
    ]);

    console.log("\n📊 État actuel:");
    console.log(`   Bloc actuel: ${currentBlock}`);
    console.log(`   Bloc cible: ${targetBlock}`);
    console.log(`   Blocs restants: ${Number(targetBlock) - currentBlock}`);
    console.log(`   Temps estimé: ~${Math.round((Number(targetBlock) - currentBlock) * network.blockTime / 60)} minutes`);

    if (currentBlock < Number(targetBlock)) {
      console.log(`\n⏳ Trop tôt pour le tirage.`);
      return;
    }

    console.log("\n🎲 Exécution du tirage...");
    console.log(`   Reveal value: ${reveal}`);
    console.log(`   Caller: ${wallet.address}`);
    
    const tx = await raffle.requestDrawing(reveal);
    console.log(`\n📤 Transaction envoyée: ${tx.hash}`);
    console.log(`   Explorer: ${network.explorerUrl}/tx/${tx.hash}`);
    
    console.log("\n⏳ Attente de la confirmation...");
    const receipt = await tx.wait();
    console.log(`\n✅ Tirage exécuté avec succès!`);
    console.log(`   Block: ${receipt.blockNumber}`);

    // Attendre un peu et récupérer les gagnants
    await new Promise(resolve => setTimeout(resolve, 2000));
    const winners = await raffle.getWinnerIds();
    console.log("\n🏆 Gagnants:");
    winners.forEach((id: bigint, index: number) => {
      console.log(`   ${index + 1}. Code: 301-${id.toString()}`);
    });

  } catch (error: any) {
    console.error("\n❌ Erreur lors de l'exécution:");
    if (error.code === 429) {
      console.error("   Trop de requêtes, veuillez réessayer dans quelques instants");
    } else {
      console.error("   Message:", error.message);
      if (error.data) {
        console.error("   Data:", error.data);
      }
      if (error.transaction) {
        console.error("   Transaction:", error.transaction);
      }
    }
  } finally {
    if (wsProvider) {
      console.log("\n🔌 Fermeture de la connexion WebSocket...");
      try {
        await wsProvider.destroy();
      } catch (error) {
        console.log("Note: La connexion WebSocket s'est fermée");
      }
    }
    // Attendre un peu avant de sortir
    await delay(1000);
    process.exit(0);
  }
}

main().catch((error) => {
  console.error("\n❌ Erreur fatale:", error);
  process.exit(1);
});