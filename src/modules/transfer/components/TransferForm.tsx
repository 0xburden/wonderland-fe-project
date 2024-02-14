import React from 'react'
import {
  FormControl,
  FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  Box,
  // Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  Heading,
} from '@chakra-ui/react'
import { useReadContracts, useAccount } from 'wagmi'
import { erc20Abi, formatUnits } from 'viem'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { setTargetAddress } from '../../redux/slices/targetAddress'
import { TokenSelect } from './TokenSelect'
import { type Address } from '../../../contstants'

export function TransferForm() {
  const token = useAppSelector((state) => state.token.value)
  const dispatch = useAppDispatch()

  const targetAddress = useAppSelector((state) => state.targetAddress)
  const { address: userAddress } = useAccount()

  const { data } = useReadContracts({
    contracts: [
      {
        address: token as Address,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [userAddress as Address, targetAddress.value as Address],
      },
      {
        address: token as Address,
        abi: erc20Abi,
        functionName: 'decimals',
      },
    ],
    query: {
      enabled: token !== null && targetAddress.isValid,
    },
  })

  const allowance = React.useMemo<number>(() => {
    if (!data || !token) {
      return 0
    }

    const [allowance, decimals] = data.map(({ result }) => result)
    return Number(formatUnits(allowance as bigint, decimals as number))
  }, [data, token])

  return (
    <Box maxW={72} w="100%">
      <Card>
        <CardHeader textAlign="center">
          <Heading>Transfer</Heading>
        </CardHeader>
        <CardBody>
          <Box as="form" method="post">
            <TokenSelect />
            <FormControl mt={2}>
              <FormLabel htmlFor="allowance" fontWeight="bold" fontSize="sm" color="blackAlpha.800">
                Allowance:
              </FormLabel>
              <NumberInput min={0} value={allowance}>
                <NumberInputField name="allowance" readOnly />
              </NumberInput>
            </FormControl>
            <FormControl mt={12}>
              <FormLabel
                htmlFor="targetAddress"
                fontWeight="bold"
                fontSize="sm"
                color="blackAlpha.800"
              >
                Target Wallet:
              </FormLabel>
              <Input
                name="targetAddress"
                value={targetAddress.value}
                onChange={(e) => dispatch(setTargetAddress(e.target.value))}
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel htmlFor="amount" fontWeight="bold" fontSize="sm" color="blackAlpha.800">
                Amount:
              </FormLabel>
              <NumberInput min={0}>
                <NumberInputField name="amount" />
              </NumberInput>
            </FormControl>
            <Button type="button" colorScheme="blue" mt={4} w="full">
              Transfer
            </Button>
          </Box>
        </CardBody>
        <CardFooter />
      </Card>
    </Box>
  )
}
