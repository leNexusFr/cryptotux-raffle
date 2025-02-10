// components/raffle/DrawingStatus.tsx
import { DrawingStatusProps } from '../../types/raffle';
import { ClockIcon } from '@heroicons/react/24/outline';
import { DRAWING_CONFIG } from '../../constants/config';

export function DrawingStatus({ 
  currentBlock, 
  targetBlock, 
  blocksRemaining, 
  secondsLeft,
  smoothProgress, 
  formatTimeRemaining 
}: DrawingStatusProps) {
  return (
    <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg transition-colors">
      <div className="flex items-center">
        <ClockIcon className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-3" />
        <h2 className="text-xl font-semibold text-blue-900 dark:text-white">
          {DRAWING_CONFIG.UI.TITLES.DRAWING_STATUS}
        </h2>
      </div>
      <div className="mt-4 space-y-4">
        <div className="space-y-2">
          <p className="text-blue-700 dark:text-blue-300">
            {DRAWING_CONFIG.UI.LABELS.CURRENT_BLOCK}: {currentBlock}
          </p>
          <p className="text-blue-700 dark:text-blue-300">
            {DRAWING_CONFIG.UI.LABELS.TARGET_BLOCK}: {targetBlock}
          </p>
          <p className="text-blue-700 dark:text-blue-300">
            {DRAWING_CONFIG.UI.LABELS.BLOCKS_REMAINING}: {blocksRemaining}
          </p>
          <p className="text-blue-700 dark:text-blue-300 font-semibold">
            {DRAWING_CONFIG.UI.LABELS.TIME_REMAINING}: {
              secondsLeft <= 0 
                ? DRAWING_CONFIG.TIME_FORMAT.IMMINENT
                : formatTimeRemaining(secondsLeft)
            }
          </p>
        </div>
        
        <div className="mt-6 space-y-2">
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 
                      dark:from-blue-400 dark:to-purple-400"
            style={{ 
              width: `${smoothProgress}%`,
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{DRAWING_CONFIG.UI.LABELS.START}</span>
          <span>{Math.round(smoothProgress)}%</span>
          <span>{DRAWING_CONFIG.UI.LABELS.DRAWING}</span>
        </div>
        </div>
      </div>
    </div>
  );
}