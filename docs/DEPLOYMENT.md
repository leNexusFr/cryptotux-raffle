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
````

# Required - Your private key (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# Required - API secret to secure the drawing endpoint (min 32 characters)
API_SECRET=your_secret_here_min_32_chars

# Optional - Override reveal value (generated during deployment)
REVEAL_VALUE=0x...
````

### Frontend (.env.local in raffle-interface/)
For local development:
````

# Required - API Authentication
API_SECRET=your_secret_here_min_32_chars
NEXT_PUBLIC_API_SECRET=your_secret_here_min_32_chars  # Must match API_SECRET

# Required - Blockchain Configuration
PRIVATE_KEY=your_private_key_here
NEXT_PUBLIC_DEFAULT_NETWORK=moonbase

# Optional
REVEAL_VALUE=0x...  # Must match the value used during deployment
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...  # Used if .contract file doesn't exist
````

### Frontend (Vercel Environment Variables)
To be configured in your Vercel project settings:
- `API_SECRET`: Secret for API authentication
- `NEXT_PUBLIC_API_SECRET`: Same as API_SECRET
- `PRIVATE_KEY`: Your wallet's private key
- `NEXT_PUBLIC_DEFAULT_NETWORK`: Network name (e.g., "moonbase")
- `NEXT_PUBLIC_CONTRACT_ADDRESS`: Contract address (if .contract file not used)
- `REVEAL_VALUE`: (Optional) Override reveal value

## Deployment Steps

### 1. Smart Contract Deployment
````

# Go to contract folder
cd moonbeam-raffle
# Install dependencies
npm install
# Deploy to Moonbase Alpha
NETWORK=moonbase npx hardhat run scripts/deploy.ts --network moonbase
````

The deployment script will:
- Deploy the contract
- Save the reveal value in `.reveal`
- Save the contract address in `.contract`
- Update config/networks.ts with the new address
- Display the contract address and file locations

### 2. Frontend Deployment
1. Verify that config/networks.ts is updated with the correct address
2. Backup `.contract` and `.reveal` files securely
3. Push your code to GitHub (excluding .env, .reveal, and .contract files)
4. Create a new project in Vercel
5. Import your repository
6. Configure environment variables
7. Deploy

### Vercel Configuration
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Environment Variables: Configure all required variables as listed above

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
   - Verify that API_SECRET and NEXT_PUBLIC_API_SECRET match
   - Check that the contract address is correct in networks.ts or .contract file
   - Verify REVEAL_VALUE if overridden
   - Check Vercel logs for more details

3. **Contract Address Issues**
   - Verify `.contract` file exists and contains correct address
   - Check `NEXT_PUBLIC_CONTRACT_ADDRESS` if `.contract` file not used
   - Ensure contract address matches the deployed network

4. **Authentication Errors**
   - Ensure API_SECRET is properly set in both environments
   - Verify NEXT_PUBLIC_API_SECRET is accessible in the frontend
   - Check authorization headers in API calls

## Support
For deployment issues:
- Open an issue on GitHub
- Contact via [cyphertux.net](https://cyphertux.net)