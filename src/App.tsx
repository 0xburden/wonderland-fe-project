import { Heading, Box } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { Layout } from './modules/global/components'

function App() {
  const account = useAccount()

  return (
    <Layout>
      <Heading>Account</Heading>

      <Box>
        status: {account.status}
        <br />
        addresses: {JSON.stringify(account.addresses)}
        <br />
        chainId: {account.chainId}
      </Box>
    </Layout>
  )
}

export default App
