import { WinnersListProps } from '../../types/raffle';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { VerifyButton } from './VerifyButton';

export function WinnersList({ winners, network }: WinnersListProps) {  
  const KODADOT_BASE_URL = "https://kodadot.xyz/ahp/gallery/";

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 shadow-inner">
      <div className="flex items-center">
        <TrophyIcon className="h-8 w-8 text-green-500 dark:text-green-400 mr-3 animate-bounce" />
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-100">
          Résultats du Tirage
        </h2>
      </div>
      <div className="mt-6 space-y-3">
        {winners.map((winner, index) => (
          <div key={index} 
              className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 shadow-sm 
                         border border-green-100 dark:border-green-800 
                         transform hover:scale-102 transition-transform">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-green-800 dark:text-green-200">
                {`🏆 ${index + 1}${index === 0 ? 'er' : 'ème'} Prix: ${winner}`}
              </p>
              <a
                href={`${KODADOT_BASE_URL}${winner}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:text-blue-600 
                          dark:text-blue-400 dark:hover:text-blue-300 
                          transition-colors ml-4"
              >
                <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
      <VerifyButton winners={winners} network={network} />
    </div>
  );
}