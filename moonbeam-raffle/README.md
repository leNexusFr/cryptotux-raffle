# CryptoXR Raffle Smart Contracts 🎲

Smart contract implementation for the CryptoXR Raffle system, providing a secure and transparent lottery system on EVM-compatible networks.

## Project Structure

```
moonbeam-raffle/
├── contracts/
│   └── LocalVRFRaffle.sol    # Main raffle contract with VRF
├── scripts/
│   ├── deploy.ts             # Deployment script
│   ├── interact.ts           # Contract interaction script
│   └── verify-participants.ts # Participant verification
├── data/
│   └── participants.ts       # Participant list (301-1 to 301-148)
└── hardhat.config.ts         # Hardhat & network configurations
```

## Supported Networks

### Moonbase Alpha
- ChainID: 1287
- RPC: https://rpc.api.moonbase.moonbeam.network
- WebSocket: wss://wss.api.moonbase.moonbeam.network
- Explorer: https://moonbase.moonscan.io
- Currency: DEV
- Block Time: 6 seconds

### Asset Hub Westend
- ChainID: 420420421
- RPC: https://westend-asset-hub-eth-rpc.polkadot.io
- WebSocket: wss://westend-asset-hub-eth-rpc.polkadot.io
- Explorer: https://westend-asset-hub-eth-explorer.parity.io
- Currency: WND
- Block Time: 6 seconds

## Quick Start

1. **Setup Environment**
```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your private key
```

2. **Deploy**
```bash
# Moonbase Alpha
NETWORK=moonbase npx hardhat run scripts/deploy.ts --network moonbase

# Asset Hub Westend
NETWORK=westend npx hardhat run scripts/deploy.ts --network westend
```

## Scripts

- `deploy.ts`: Deploys contract and updates interface configuration
- `interact.ts`: Handles contract interactions (drawing execution)
- `verify-participants.ts`: Validates participant codes (301-1 to 301-148)

## Development

### Compile Contracts
```bash
npx hardhat compile
```

### Run Tests
```bash
npx hardhat test
```

## Features

- 🎯 Custom VRF (Verifiable Random Function)
- 🔒 Commit-reveal pattern
- 🏆 Multiple winner support
- 📡 Real-time WebSocket updates
- 🔐 Authorization system
- ⚡ 6-second block time optimization
- ✅ On-chain verification

## Security

The contract implements several security measures:
- Commit-reveal scheme for randomness
- Block-based entropy source
- Authorization controls
- Reentrancy protection
- Event emission for transparency

## License

MIT License with Attribution Requirement - see the [LICENSE](../LICENSE) file for details.

---

Part of the [CryptoXR Raffle](https://github.com/cyphertux/tux-raffle) project by [cyphertux.net](https://cyphertux.net) 🏴‍☠️