import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { WagmiProvider } from './modules/wagmi/components'
import { RainbowKitProvider } from './modules/wagmi/components'
import { ReduxProvider } from './modules/redux/components'

interface ProvidersProps {
  children?: React.ReactNode
}

const queryClient = new QueryClient()

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider>
        <RainbowKitProvider>
          <ChakraProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
