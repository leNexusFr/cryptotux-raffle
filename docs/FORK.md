# Fork Guide - CryptoTux Raffle 🎲

## 1. Fork Repository
1. Visit https://github.com/cyphertux/cryptotux-raffle
2. Click the "Fork" button in the top right
3. Select your account as destination

## 2. Clone your Fork
```bash
# Clone repo
git clone https://github.com/YOUR-USERNAME/cryptotux-raffle
cd cryptotux-raffle
```

## 3. Setup
```bash
# Install dependencies
cd moonbeam-raffle && npm install
cd ../raffle-interface && npm install

# Configure environment files
cp moonbeam-raffle/.env.example moonbeam-raffle/.env
cp raffle-interface/.env.example raffle-interface/.env.local  # Note: .env.local for Next.js
```

### Environment Variables Setup

1. **In `/raffle-interface/.env.local`**:
```env
# API Authentication
API_SECRET=your-complex-secret-123
NEXT_PUBLIC_API_SECRET=your-complex-secret-123  # Must match API_SECRET

# Blockchain Configuration
PRIVATE_KEY=your-private-key
NEXT_PUBLIC_DEFAULT_NETWORK=moonbase

# Optional
REVEAL_VALUE=0x...  # Only if you want to override the generated value
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...  # Only if .contract file doesn't exist
```

2. **In `/moonbeam-raffle/.env`**:
```env
# Required
PRIVATE_KEY=your-private-key-without-0x
API_SECRET=your-complex-secret-123  # Must match raffle-interface

# Optional
REVEAL_VALUE=0x...  # Generated during deployment
```

⚠️ Important:
- `API_SECRET` and `NEXT_PUBLIC_API_SECRET` must be identical
- `PRIVATE_KEY` should not include "0x" prefix in moonbeam-raffle
- Use complex values for security (min 32 characters for API_SECRET)
- Never commit .env files

### Contract Address Management

During deployment, two files are automatically created:
- `.reveal` - Contains the reveal value for the VRF
- `.contract` - Contains the deployed contract address

These files are used by the interface to:
1. Locate the deployed contract
2. Execute the drawing with the correct reveal value

⚠️ Important:
- These files are automatically generated during deployment
- `.contract` takes precedence over `NEXT_PUBLIC_CONTRACT_ADDRESS` environment variable
- Don't commit these files to your repository
- Back them up securely after deployment

Example structure after deployment:
```bash
moonbeam-raffle/
├── .contract         # Contains deployed contract address
├── .reveal          # Contains VRF reveal value
└── ...
```

## 4. Local Testing
```bash
# Start development
cd raffle-interface
npm run dev
# Access at http://localhost:3000
```

## 5. Deployment
```bash
# Deploy contract
cd moonbeam-raffle
NETWORK=moonbase npx hardhat run scripts/deploy.ts --network moonbase

# Deploy interface
# 1. Push to GitHub
# 2. Import in Vercel
# 3. Configure environment variables in Vercel:
#    - API_SECRET
#    - NEXT_PUBLIC_API_SECRET (same as API_SECRET)
#    - PRIVATE_KEY
#    - NEXT_PUBLIC_DEFAULT_NETWORK
#    - REVEAL_VALUE (optional)
# 4. Deploy
```

## Important Notes
- Use on testnet only (Moonbase Alpha)
- Need DEV tokens (faucet available)
- Don't forget to include CryptoTux attribution
- Never commit .env files
- Keep your private keys secret
- Ensure API authentication is properly configured

## Support
- GitHub Issues: https://github.com/cyphertux/cryptotux-raffle/issues
- Documentation: https://github.com/cyphertux/cryptotux-raffle/docs