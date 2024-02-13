import { Box, Flex, Text, Heading } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function App() {
  const account = useAccount()

  return (
    <>
      <Box minW="100vw" minH="100vh" bg="grey.100">
        <Flex alignItems="center" justifyContent="space-between" p={4} w="100%">
          <ConnectButton />
        </Flex>

        <Heading>Account</Heading>

        <Box>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </Box>
      </Box>
    </>
  )
}

export default App
