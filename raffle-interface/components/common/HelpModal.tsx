interface HelpModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }
  
  export function HelpModal({ isOpen, setIsOpen }: HelpModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/25 dark:bg-black/50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
  
        {/* Modal */}
        <div className="relative min-h-full flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
            {/* Titre */}
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Comment fonctionne le tirage ?
            </h3>
  
            {/* Contenu */}
            <div className="mt-4 space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                <span className="font-medium">🎲 Principe</span><br/>
                Un tirage au sort décentralisé et vérifiable sur la blockchain.
              </p>
  
              <p className="text-sm text-gray-500 dark:text-gray-300">
                <span className="font-medium">⏳ Déroulement</span><br/>
                Le tirage s'effectue automatiquement une fois le bloc cible atteint.
              </p>
  
              <p className="text-sm text-gray-500 dark:text-gray-300">
                <span className="font-medium">🔒 Sécurité</span><br/>
                Utilisation d'un système VRF pour garantir l'aléatoire et la transparence.
              </p>
  
              <p className="text-sm text-gray-500 dark:text-gray-300">
                <span className="font-medium">✅ Vérification</span><br/>
                Tous les résultats sont vérifiables sur la blockchain via le bouton "Vérifier".
              </p>
            </div>
  
            {/* Bouton */}
            <div className="mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex justify-center rounded-md bg-blue-100 dark:bg-blue-900 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                J'ai compris
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }