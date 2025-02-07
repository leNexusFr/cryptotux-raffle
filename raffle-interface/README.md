# CryptoTux Raffle 🎲

> ⚠️ **TESTNET ONLY** - This is a beta project intended for testing purposes only. Do not use on mainnet.

A decentralized, transparent, and verifiable raffle system built on blockchain technology.

[Live Demo](https://raffle.cyphertux.net) | [Documentation](https://github.com/cyphertux/tux-raffle)

## Overview

CryptoTux Raffle provides a complete solution for organizing transparent and verifiable raffles on blockchain. Built with security and fairness in mind, it uses a custom VRF (Verifiable Random Function) implementation for true randomness.

## Project Structure
```
cryptotux-raffle/
├── moonbeam-raffle/        # Smart Contract Implementation
│   ├── contracts/          # Solidity smart contracts
│   ├── scripts/            # Deployment & interaction scripts
│   └── data/              # Participant configuration
└── raffle-interface/       # Next.js Frontend
    ├── components/         # React components
    ├── config/            # Network configurations
    ├── constants/         # Application constants
    ├── hooks/             # Custom React hooks
    ├── pages/             # Next.js pages & API routes
    ├── public/            # Static assets
    ├── styles/            # CSS & Tailwind styles
    ├── types/             # TypeScript definitions
    └── utils/             # Utility functions
```

## Prerequisites

- Node.js >= 18
- Git
- Wallet with test tokens
  - DEV for Moonbase Alpha
  - WND for Asset Hub Westend

## Quick Start

```bash
# Clone the repository
git clone https://github.com/cyphertux/cryptotux-raffle
cd cryptotux-raffle

# Install dependencies
cd moonbeam-raffle && npm install
cd ../raffle-interface && npm install

# Configure environment
cp moonbeam-raffle/.env.example moonbeam-raffle/.env
cp raffle-interface/.env.example raffle-interface/.env
# Edit .env files with your configuration
```

## Development

```bash
# Start local development with Moonbase Alpha
cd raffle-interface
npm run dev:moonbase

# Or with Asset Hub Westend
npm run dev:westend
```

## Production Deployment

1. **Deploy Smart Contract**
```bash
cd moonbeam-raffle
NETWORK=moonbase npx hardhat run scripts/deploy.ts --network moonbase
```

2. **Deploy Interface**
- Push to GitHub
- Import in Vercel
- Configure required environment variables:
  - `NEXT_PUBLIC_DEFAULT_NETWORK`
  - `API_SECRET`
- Deploy

Detailed deployment instructions in [DEPLOYMENT.md](./DEPLOYMENT.md)

## Key Features

- 🎲 Decentralized raffle system
- 🔒 Custom VRF implementation
- ⚡ Real-time WebSocket updates
- 🌓 Dark/Light theme support
- 📱 Responsive design
- ✅ On-chain result verification
- 🔄 6-second block time optimization
- 🛡️ Enhanced security measures

## Documentation

- [Deployment Guide](./DEPLOYMENT.md)
- [Terms of Use](./raffle-interface/TERMS.md)
- [Smart Contract README](./moonbeam-raffle/README.md)

## License

MIT License with Attribution Requirement

Copyright (c) 2024 CypherTux

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

1. The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
2. Any project using this Software must include a visible attribution link to https://github.com/cyphertux/cryptotux-raffle in their interface or documentation.

---

Built with 🏴‍☠️ by [cyphertux.net](https://cyphertux.net)