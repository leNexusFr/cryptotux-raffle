/**
 * @file CryptoTux Raffle App Entry
 * @copyright 2025 CypherTux
 * @license MIT with Attribution
 */
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react' // Ajout de useState
import { logBranding } from '../utils/branding'
import { HelpModal } from '../components/common/HelpModal'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    logBranding();
  }, []);

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
      
      {/* Bouton d'aide */}
      <button
        onClick={() => setIsHelpOpen(true)}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-blue-500 hover:bg-blue-600 
                   text-white shadow-lg transition-colors duration-200 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Aide"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-6 h-6"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" 
          />
        </svg>
      </button>

      {/* Modal d'aide */}
      <HelpModal isOpen={isHelpOpen} setIsOpen={setIsHelpOpen} />
    </ThemeProvider>
  )
}

export default MyApp