import { NetworkInfoProps } from '../../types/raffle';

export function NetworkInfo({ network }: NetworkInfoProps) {
  const truncateAddress = (address: string = '') => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
        Informations du réseau
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        Réseau : {network.name}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        Contrat : {' '}
        <span className="hidden sm:inline">{network.contractAddress}</span>
        <span className="inline sm:hidden">{truncateAddress(network.contractAddress)}</span>
      </p>
      <a 
        href={`${network.explorerUrl}/address/${network.contractAddress}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 
                   dark:hover:text-blue-300 mt-2 inline-block transition-colors"
      >
        Voir sur {network.name} Explorer →
      </a>
    </div>
  );
}