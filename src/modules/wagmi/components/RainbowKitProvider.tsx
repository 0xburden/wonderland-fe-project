import '@rainbow-me/rainbowkit/styles.css'

import React from 'react'
import { RainbowKitProvider as RainbowKitBaseProvider } from '@rainbow-me/rainbowkit'

interface RainbowKitBaseProviderProps {
  children?: React.ReactNode
}

export function RainbowKitProvider({ children }: RainbowKitBaseProviderProps) {
  return <RainbowKitBaseProvider>{children}</RainbowKitBaseProvider>
}
