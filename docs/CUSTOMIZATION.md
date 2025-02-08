# CryptoTux Raffle Customization Guide 🎨

## Participant System

### ID Format
Current format: `301-{id}` where id ranges from 1 to 148
````

// in /moonbeam-raffle/data/participants.ts
export const participants = [
  { id: 1, code: "301-1" },
  // ... customize your format
  { id: 100, code: "YOUR-FORMAT-100" }
];
````

### Validation Rules
````

// Customize validation rules
const invalidCodes = participants.filter(p => 
  p.code !== `YOUR-PREFIX-${p.id}` || 
  p.id < 1 || 
  p.id > YOUR_MAX_ID
);
````

## Network Configuration

### Contract Address Management
The contract address can be managed in two ways:
1. Using `.contract` file (recommended)
2. Using environment variables

#### Option 1: .contract File
````

# Automatically generated during deployment
# Or manually create in moonbeam-raffle/.contract
echo "0xYourContractAddress" > .contract
````

#### Option 2: Environment Variable
````

// in .env.local or Vercel
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
````

### Network Settings
Add or modify networks:
````

// in /raffle-interface/config/networks.ts
export const NETWORKS = {
  "your-network": {
    name: "Your Network",
    rpcUrl: "https://your-rpc-url",
    wsUrl: "wss://your-ws-url",
    chainId: YOUR_CHAIN_ID,
    explorerUrl: "https://your-explorer",
    symbol: "TOKEN",
    blockTime: 6  // Block time in seconds
  }
};
````

## API Customization

### Authentication
````

// in /raffle-interface/pages/api/execute-drawing.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Customize authentication if needed
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // ... rest of the handler
}
````

### Environment Variables
````

// Required in .env.local and Vercel
API_SECRET=your_secret_here
NEXT_PUBLIC_API_SECRET=your_secret_here  // Must match API_SECRET

// Optional
REVEAL_VALUE=0x...  // Override default reveal value
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...  // Used if .contract file doesn't exist
````

## UI Customization

### ⚠️ Protected Elements
The following elements MUST remain unchanged as per the license agreement:
- CryptoTux attribution
- License information
- Footer credits
- GitHub repository links
- API authentication mechanism

### Branding
You can customize these elements:
````

// in /raffle-interface/utils/branding.ts
export const BRAND = {
  title: "Your Raffle Name",        // Your raffle name
  description: "Your description",   // Your raffle description
  primaryColor: "#YOUR_COLOR",      // Your theme color
  // DO NOT REMOVE OR MODIFY:
  // - Attribution links
  // - CryptoTux references
  // - License information
};
````

### Styling
You can customize:
- Color scheme in `tailwind.config.ts`
- Custom CSS in `styles/globals.css`
- Component layouts in `/components`

### Limitations
As per the MIT License with Attribution Requirement:
1. The CrypherTux attribution MUST remain visible
2. The GitHub repository link MUST be maintained
3. The footer credits MUST not be modified
4. The license information MUST be preserved
5. The API authentication mechanism MUST be maintained