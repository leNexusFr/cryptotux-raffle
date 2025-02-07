"use client"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`
          inline-flex h-8 w-14 items-center rounded-full
          transition-colors duration-300 ease-in-out
          ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}
          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
          ${className}
        `}
      >
        <span className="sr-only">Toggle theme</span>
        <div
          className={`
            ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}
            flex h-6 w-6 transform rounded-full
            bg-white shadow-lg ring-0 transition duration-300 ease-in-out
            items-center justify-center
          `}
        >
          {theme === 'dark' ? (
            <MoonIcon className="h-4 w-4 text-gray-800" />
          ) : (
            <SunIcon className="h-4 w-4 text-yellow-500" />
          )}
        </div>
      </button>
    </div>
  );
}