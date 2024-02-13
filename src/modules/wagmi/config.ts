import { http, createConfig } from 'wagmi'
import { goerli } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [goerli],
  connectors: [
    injected(),
  ],
  transports: {
    [goerli.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
