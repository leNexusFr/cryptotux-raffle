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
cp raffle-interface/.env.example raffle-interface/.env
```

### Environment Variables Setup

1. **In `/raffle-interface/.env.local`**:
```env
API_SECRET=your-complex-secret-123
```

2. **In `/moonbeam-raffle/.env`**:
```env
PRIVATE_KEY=your-private-key-without-0x
API_SECRET=your-complex-secret-123  # Must match raffle-interface
```

⚠️ Important:
- `API_SECRET` must be identical in both files
- `PRIVATE_KEY` should not include "0x" prefix
- Use complex values for security

## 4. Local Testing
```bash
# Start development
cd raffle-interface
npm run dev:moonbase
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
#    - API_SECRET (same as local)
# 4. Deploy
```

## Important Notes
- Use on testnet only (Moonbase Alpha)
- Need DEV tokens (faucet available)
- Don't forget to include CryptoTux attribution
- Never commit .env files
- Keep your private keys secret

## Support
- GitHub Issues: https://github.com/cyphertux/cryptotux-raffle/issues
- Documentation: https://github.com/cyphertux/tux-raffle