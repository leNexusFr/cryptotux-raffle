const fs = require('fs');
const path = require('path');

const updateTerms = () => {
  const termsPath = path.join(__dirname, '../TERMS.md');
  const currentDate = new Date().toISOString().split('T')[0];
  const version = require('../package.json').version;

  const termsContent = `# Terms of Use

Last Updated: ${currentDate}
Version: ${version}

## 1. Acceptance of Terms

By accessing and using the CryptoTux Raffle ("Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, do not use the Service.

## 2. Service Description

CryptoTux Raffle is a decentralized raffle system operating exclusively on test networks:
- Moonbase Alpha (Moonbeam Testnet)
- Asset Hub Westend (Polkadot Testnet)

## 3. Test Network Only

⚠️ **IMPORTANT**: This service is for TESTING PURPOSES ONLY
- Do not use on mainnet
- Use test tokens only (DEV, WND)
- No real value transactions

## 4. User Responsibilities

Users must:
- Use test networks only
- Maintain wallet security
- Not attempt to manipulate results
- Report any bugs or vulnerabilities
- Not use for commercial purposes

## 5. Raffle Process

The raffle system:
- Uses VRF for randomness
- Is fully verifiable on-chain
- Has a 6-second block time
- Supports multiple winners
- Updates in real-time

## 6. Technical Requirements

Users need:
- Web3 compatible browser
- Test network wallet
- Test tokens
- Node.js >= 18 (for development)

## 7. Limitations of Liability

The Service is provided "as is" without warranties. We are not liable for:
- Network issues
- Wallet connectivity problems
- Smart contract limitations
- Test network instability

## 8. Intellectual Property

This project is under MIT License with Attribution Requirement:
- Source code can be modified
- Attribution must be maintained
- CryptoTux branding must be credited

## 9. Modifications

We reserve the right to modify these terms. Users will be notified of changes through:
- GitHub repository updates
- Interface notifications
- Version control system

## 10. Contact

For support:
- GitHub Issues
- Documentation portal
- Development community

## 11. Termination

We reserve the right to terminate access for:
- Mainnet usage attempts
- Terms violation
- System abuse
- Harmful behavior

---

By using CryptoTux Raffle, you acknowledge reading and accepting these terms.

Built with 🏴‍☠️ by [cyphertux.net](https://cyphertux.net)`;

  fs.writeFileSync(termsPath, termsContent);
  console.log('✅ TERMS.md updated successfully');
};

updateTerms();