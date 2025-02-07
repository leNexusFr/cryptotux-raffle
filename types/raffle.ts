// types/raffle.ts
import { NetworkConfig } from '../config/networks';
import { DRAWING_CONFIG } from '../constants/config';

export interface DrawingStatusProps {
  currentBlock: number;
  targetBlock: number;
  blocksRemaining: number;
  secondsLeft: number;
  progressPercentage: number;
  smoothProgress: number;
  formatTimeRemaining: typeof DRAWING_CONFIG.TIME_FORMAT.formatTime;
}

export interface WinnersListProps {
  winners: Array<string>;
  maxWinners?: typeof DRAWING_CONFIG.WINNERS.MAX_WINNERS;
  network: NetworkConfig;
}

export interface NetworkInfoProps {
  network: NetworkConfig;
}