// data/participants.ts
export interface ParticipantCode {
    id: number;      // 1 à 148
    code: string;    // format "301-X"
  }
  
  // Génère automatiquement la liste de 301-1 à 301-148
  export const participants: ParticipantCode[] = Array.from(
    { length: 148 }, 
    (_, index) => ({
      id: index + 1,
      code: `301-${index + 1}`
    })
  );
  
  // Utilitaires
  export function getParticipantCode(id: number): string {
    if (id < 1 || id > 148) throw new Error("ID hors limites");
    return `301-${id}`;
  }
  
  // Pour vérification
  export function validateParticipants() {
    console.log("Premier participant:", participants[0]);          // { id: 1, code: "301-1" }
    console.log("Dernier participant:", participants[147]);        // { id: 148, code: "301-148" }
    console.log("Nombre total de participants:", participants.length); // 148
  }