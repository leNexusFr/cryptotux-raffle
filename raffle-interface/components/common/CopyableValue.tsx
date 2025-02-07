import { useState } from 'react';
import { Toast } from './Toast';

interface CopyableValueProps {
  label: string;
  value: string;
  icon: string;
}

export function CopyableValue({ label, value, icon }: CopyableValueProps) {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setShowToast(true);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <>
      <p className="flex items-center gap-2 group">
        <span>{icon}</span>
        <span className="flex-1">
          {label}: {value.slice(0, 10)}...{value.slice(-8)}
        </span>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          title={`Copier le ${label.toLowerCase()} complet`}
        >
          📋
        </button>
      </p>
      <Toast 
        message={`${label} copié !`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}