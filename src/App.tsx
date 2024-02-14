import { Flex } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { Layout, Disconnected } from './modules/global/components'
import { TransferForm } from './modules/transfer/components'

function App() {
  const { isConnected } = useAccount()

  return (
    <Layout>
      {isConnected ? (
        <Flex alignItems="center" justifyContent="center" direction="column">
          <TransferForm />
        </Flex>
      ) : (
        <Disconnected />
      )}
    </Layout>
  )
}

export default App
