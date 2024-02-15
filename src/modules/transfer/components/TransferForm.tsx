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
import { useReadContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { erc20Abi, formatUnits } from 'viem'
import { useApproval, useTransfer } from '../hooks'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { setTargetAddress } from '../../redux/slices/targetAddress'
import { TokenSelect } from './TokenSelect'
import { type Address } from '../../../contstants'

export function TransferForm() {
  const token = useAppSelector((state) => state.token.value)
  const tokenInfo = useAppSelector((state) => state.tokenInfo.value)
  const dispatch = useAppDispatch()

  const targetAddress = useAppSelector((state) => state.targetAddress)
  const { address: userAddress } = useAccount()

  const [amount, setAmount] = React.useState(0)

  const { data: balanceData, refetch: refetchBalance } = useReadContract({
    address: token as Address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [userAddress as Address],
    query: {
      enabled: token !== null && !!userAddress,
    },
  })

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: token as Address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [userAddress as Address, targetAddress.value as Address],
    query: {
      enabled: token !== null && targetAddress.isValid,
    },
  })

  const { approve, isPending: isApproving, data: approvalHash } = useApproval(amount)

  const { isLoading: isConfirmingApproval } = useWaitForTransactionReceipt({
    hash: approvalHash,
    query: {
      select(data) {
        refetchAllowance()
        return data
      },
    },
  })

  const { transfer, isPending: isTransferring, data: transferHash } = useTransfer(amount)

  const { isLoading: isConfirmingTransfer } = useWaitForTransactionReceipt({
    hash: transferHash,
    query: {
      select(data) {
        refetchBalance()
        return data
      },
    },
  })

  const allowance = React.useMemo<number>(
    () =>
      !allowanceData || !tokenInfo
        ? 0
        : Number(formatUnits(allowanceData as bigint, tokenInfo?.decimals as number)),
    [allowanceData, tokenInfo],
  )

  const balance = React.useMemo<number>(
    () =>
      !balanceData || !tokenInfo
        ? 0
        : Number(formatUnits(balanceData as bigint, tokenInfo?.decimals as number)),
    [balanceData, tokenInfo],
  )

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
              <NumberInput min={0} value={allowance} isDisabled>
                <NumberInputField
                  name="allowance"
                  readOnly
                  _disabled={{ opacity: 1, cursor: 'not-allowed', bg: 'blackAlpha.100' }}
                />
              </NumberInput>
            </FormControl>
            <FormControl mt={2}>
              <FormLabel htmlFor="allowance" fontWeight="bold" fontSize="sm" color="blackAlpha.800">
                Balance:
              </FormLabel>
              <NumberInput min={0} value={balance}>
                <NumberInputField name="balance" readOnly />
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
                placeholder="0x1D70D57ccD2798323232B2dD027B3aBcA5C00091"
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel htmlFor="amount" fontWeight="bold" fontSize="sm" color="blackAlpha.800">
                Amount:
              </FormLabel>
              <NumberInput min={0} max={balance}>
                <NumberInputField
                  onChange={(e) => setAmount(Number(e.target.value))}
                  value={amount}
                  name="amount"
                />
              </NumberInput>
            </FormControl>
            {allowance >= amount && allowance > 0 ? (
              <Button
                type="button"
                colorScheme="blue"
                mt={4}
                w="full"
                isLoading={isTransferring || isConfirmingTransfer}
                isDisabled={!targetAddress.isValid || isTransferring || isConfirmingTransfer}
                onClick={() => transfer()}
              >
                Transfer
              </Button>
            ) : (
              <Button
                type="button"
                colorScheme="yellow"
                mt={4}
                w="full"
                isLoading={isApproving || isConfirmingApproval}
                isDisabled={!targetAddress.isValid || isApproving || isConfirmingApproval}
                onClick={() => approve()}
              >
                Approve
              </Button>
            )}
          </Box>
        </CardBody>
        <CardFooter />
      </Card>
    </Box>
  )
}
