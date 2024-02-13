import { Flex, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Header() {
  return (
    <Flex alignItems="center" justifyContent="space-between" p={4} w="100%">
      <Text fontWeight="black" fontSize="lg">
        FE Project
      </Text>
      <ConnectButton />
    </Flex>
  )
}
