// scripts/verify-participants.ts
import { participants, validateParticipants } from "../data/participants";

async function main() {
  console.log("Vérification de la liste des participants...");
  
  validateParticipants();

  // Vérification supplémentaire
  const invalidCodes = participants.filter(p => 
    p.code !== `301-${p.id}` || 
    p.id < 1 || 
    p.id > 148
  );

  if (invalidCodes.length > 0) {
    console.error("Codes invalides trouvés:", invalidCodes);
  } else {
    console.log("Tous les codes sont valides !");
    console.log("Exemple de codes:");
    console.log("Premier:", participants[0].code);
    console.log("Milieu:", participants[73].code);
    console.log("Dernier:", participants[147].code);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });