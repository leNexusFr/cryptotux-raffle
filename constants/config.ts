export const DRAWING_CONFIG = {
    // Configuration technique
    REFRESH_INTERVAL: 12000,
    DRAWING_DELAY: 6000,
    
    // Configuration des gagnants
    WINNERS: {
      MAX_WINNERS: 3,
      CODE_PREFIX: "301-"
    },
    
    // Configuration de l'interface
    UI: {
      TITLES: {
        DRAWING_STATUS: "État du Tirage"
      },
      LABELS: {
        CURRENT_BLOCK: "Bloc actuel",
        TARGET_BLOCK: "Bloc cible",
        BLOCKS_REMAINING: "Blocs restants",
        TIME_REMAINING: "Temps restant",
        START: "Début",
        DRAWING: "Tirage"
      },
      PROGRESS_BAR: {
        TRANSITION: 'width 1s ease-in-out'
      }
    },
    
    // Formatage du temps
    TIME_FORMAT: {
      IMMINENT: "Tirage imminent",
      formatTime: (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (minutes > 0) {
          return `≈ ${minutes} minute${minutes > 1 ? 's' : ''} et ${remainingSeconds} seconde${remainingSeconds > 1 ? 's' : ''}`;
        }
        return `≈ ${remainingSeconds} seconde${remainingSeconds > 1 ? 's' : ''}`;
      }
    }
  } as const;