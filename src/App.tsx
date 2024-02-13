import { Box, Flex, Text, Heading } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function App() {
  const account = useAccount()

  return (
    <Box minW="100vw" minH="100vh" bg="grey.100" color="blackAlpha.900">
      <Box maxW="92rem" m="auto">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          p={4}
          w="100%"
          borderBottom="1px solid black"
          borderColor="blackAlpha.500"
        >
          <Text fontWeight="black" fontSize="lg">
            FE Project
          </Text>

          <ConnectButton />
        </Flex>

        <Box mt={8}>
          <Heading>Account</Heading>

          <Box>
            status: {account.status}
            <br />
            addresses: {JSON.stringify(account.addresses)}
            <br />
            chainId: {account.chainId}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App
