import { Heading, Flex, Box } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { Layout, Disconnected } from './modules/global/components'

function App() {
  const { isConnected } = useAccount()

  return (
    <Layout>
      {isConnected ? (
        <Flex alignItems="center" justifyContent="center" direction="column">
          <Heading textAlign="center">Do Things</Heading>
          <Box>things go here</Box>
        </Flex>
      ) : (
        <Disconnected />
      )}
    </Layout>
  )
}

export default App
