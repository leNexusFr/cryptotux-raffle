# Deployment Guide

⚠️ **IMPORTANT WARNING**

This raffle system is designed for demonstration and testing purposes only:
- Use ONLY on test networks (Moonbase Alpha, testnets)
- DO NOT deploy on main networks (Moonbeam, mainnet)
- DO NOT use for real-stakes raffles
- Code has NOT been audited for production

Using this on a main network could lead to:
- Security risks
- Loss of funds
- Unexpected behaviors

## Prerequisites

- Node.js >= 18
- Git
- Private key with funds (DEV tokens for Moonbase Alpha)
- Vercel account (for frontend deployment)

## Environment Variables
### Smart Contract (.env in moonbeam-raffle/)
```bash
# Required - Your private key (without 0x prefix)
PRIVATE_KEY=your_private_key_here
# Required - API secret to secure the drawing endpoint (min 32 characters)
API_SECRET=your_secret_here_min_32_chars
```

### Frontend (.env.local in raffle-interface/)
For local development:
```bash
# Required - Same secret as in moonbeam-raffle/.env
API_SECRET=your_secret_here_min_32_chars
```

### Frontend (Vercel Environment Variables)
To be configured in your Vercel project settings:
- `API_SECRET`: Same secret as in moonbeam-raffle/.env

## Deployment Steps
### 1. Smart Contract Deployment
```bash
# Go to contract folder
cd moonbeam-raffle
# Install dependencies
npm install
# Deploy to Moonbase Alpha
NETWORK=moonbase npx hardhat run scripts/deploy.ts --network moonbase
```

The deployment script will:
- Deploy the contract
- Save the reveal value in .reveal
- Update config/networks.ts with the new address
- Display the contract address

### 2. Frontend Deployment
1. Verify that config/networks.ts is updated with the correct address
2. Push your code to GitHub
3. Create a new project in Vercel
4. Import your repository
5. Configure environment variables
6. Deploy

### Vercel Configuration
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Environment Variables: Configure `API_SECRET`

## Post-Deployment Verification
1. Verify that the contract is properly deployed on the explorer
2. Test the interface on Vercel
3. Verify that the drawing can be executed
4. Test results verification

## Troubleshooting
### Common Issues
1. **Contract Deployment Failure**
   - Verify that PRIVATE_KEY is correct
   - Ensure the wallet has sufficient funds
   - Check network connection

2. **Frontend API Errors**
   - Verify that API_SECRET matches across all environments
   - Check that the contract address is correct in networks.ts
   - Check Vercel logs for more details

## Support
For deployment issues:
- Open an issue on GitHub
- Contact via [cyphertux.net](https://cyphertux.net)