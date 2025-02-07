# CryptoTux Raffle Customization Guide 🎨

## Participant System

### ID Format
Current format: `301-{id}` where id ranges from 1 to 148
```typescript
// in /moonbeam-raffle/data/participants.ts
export const participants = [
  { id: 1, code: "301-1" },
  // ... customize your format
  { id: 100, code: "YOUR-FORMAT-100" }
];
```

### Validation Rules
```typescript
// Customize validation rules
const invalidCodes = participants.filter(p => 
  p.code !== `YOUR-PREFIX-${p.id}` || 
  p.id < 1 || 
  p.id > YOUR_MAX_ID
);
```

## Network Configuration

Add or modify networks:
```typescript
// in /raffle-interface/config/networks.ts
export const NETWORKS = {
  "your-network": {
    name: "Your Network",
    rpcUrl: "https://your-rpc-url",
    wsUrl: "wss://your-ws-url",
    chainId: YOUR_CHAIN_ID,
    explorerUrl: "https://your-explorer",
    symbol: "TOKEN",
    blockTime: 6
  }
};
```

## UI Customization

### ⚠️ Protected Elements
The following elements MUST remain unchanged as per the license agreement:
- CryptoTux attribution
- License information
- Footer credits
- GitHub repository links

### Branding
You can customize these elements:
```typescript
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
```

### Styling
You can customize:
- Color scheme in `tailwind.config.ts`
- Custom CSS in `styles/globals.css`
- Component layouts in `/components`

### Limitations
As per the MIT License with Attribution Requirement:
1. The CryphoTux attribution MUST remain visible
2. The GitHub repository link MUST be maintained
3. The footer credits MUST not be modified
4. The license information MUST be preserved