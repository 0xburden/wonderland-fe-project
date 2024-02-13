import React from 'react'
import { WagmiProvider as WagmiBaseProvider } from 'wagmi'
import { config } from '../'

interface WagmiProviderProps {
  children?: React.ReactNode
}

export function WagmiProvider({ children }: WagmiProviderProps) {
  return <WagmiBaseProvider config={config}>{children}</WagmiBaseProvider>
}
