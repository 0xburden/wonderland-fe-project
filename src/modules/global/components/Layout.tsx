import React from 'react'
import { Box } from '@chakra-ui/react'
import { Header } from './'

interface LayoutProps {
  children?: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box minW="100vw" minH="100vh" bg="grey.100" color="blackAlpha.900">
      <Box maxW="92rem" m="auto">
        <Header />
        <Box mt={8}>{children}</Box>
      </Box>
    </Box>
  )
}
