/**
 * @file CryptoTux Raffle Branding
 * @copyright 2024 CypherTux
 * @license MIT with Attribution
 * 
 * This file is protected by license.
 * Removal or modification of branding elements is prohibited.
 * See LICENSE for full terms.
 */

export const SIGNATURES = {
    ascii: `
  █▀▀ █▄█ █▀█ █░█ █▀▀ █▀█ ▀█▀ █░█ ▀▄▀
  █▄▄ ░█░ █▀▀ █▀█ ██▄ █▀▄ ░█░ █▄█ █░█
    `,
    logo: '🏴‍☠️  CryptoTux Raffle',
    credit: 'by cyphertux.net',
    repository: 'https://github.com/cyphertux/tux-raffle'
  } as const;
  
  export const logBranding = () => {
    // Security notice
    console.log('%cDeveloper Console - No commands should be pasted here.', 
      'color: #ef4444; font-size: 12px;'
    );
    
    // Main branding
    console.log(`%c${SIGNATURES.ascii}`, 'color: #3b82f6; font-weight: bold;');
    console.log(`%c${SIGNATURES.logo} %c${SIGNATURES.credit}`, 
      'color: #10b981; font-weight: bold;', 
      'color: #6b7280; font-weight: bold;'
    );
    
    // License and attribution
    console.log('\n%cLicense', 'color: #6b7280; font-weight: bold;');
    console.log(
      '%cMIT License with Attribution - Copyright (c) 2025 CypherTux\n' +
      'Permission is granted to use this software under the following conditions:\n' +
      '- The above copyright notice must be included in all copies\n' +
      '- Attribution link to repository must be maintained\n' +
      '- Full terms at: ' + SIGNATURES.repository,
      'color: #9ca3af; font-size: 11px;'
    );
  };