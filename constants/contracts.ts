export const RAFFLE_ABI = [
    "function getWinnerIds() view returns (uint256[3])",
    "function targetBlock() view returns (uint256)",
    "function isDrawingComplete() view returns (bool)",
    "function result() view returns (tuple(uint256[3] winnerIds, bytes32 randomSeed, uint256 drawBlock, bytes32 commitReveal))",
    "event DrawingInitiated(uint256 targetBlock, uint256 participantCount)",
    "event WinnersSelected(uint256[3] winnerIds, bytes32 randomSeed, bytes32 commitReveal)"
] as const;