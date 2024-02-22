import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  Heading,
} from "@chakra-ui/react";
import {
  useReadContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { erc20Abi, formatUnits } from "viem";
import { useApproval, useTransfer } from "../hooks";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setTargetAddress } from "../../redux/slices/targetAddress";
import { TokenSelect } from "./TokenSelect";
import { type Address } from "../../../contstants";

export function TransferForm() {
  const token = useAppSelector((state) => state.token.value);
  const tokenInfo = useAppSelector((state) => state.tokenInfo.value);
  const dispatch = useAppDispatch();

  const targetAddress = useAppSelector((state) => state.targetAddress);
  const { address: userAddress, isConnected } = useAccount();

  const [amount, setAmount] = React.useState(0);

  const { data: balanceData, refetch: refetchBalance } = useReadContract({
    address: token as Address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [userAddress as Address],
    query: {
      enabled: token !== null && !!userAddress,
    },
  });

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: token as Address,
    abi: erc20Abi,
    functionName: "allowance",
    args: [userAddress as Address, targetAddress.value as Address],
    query: {
      enabled: token !== null && targetAddress.isValid,
    },
  });

  const {
    approve,
    isPending: isApproving,
    data: approvalHash,
  } = useApproval(amount);

  const { isLoading: isConfirmingApproval } = useWaitForTransactionReceipt({
    hash: approvalHash,
    query: {
      select(data) {
        refetchAllowance();
        return data;
      },
    },
  });

  const {
    transfer,
    isPending: isTransferring,
    data: transferHash,
  } = useTransfer(amount);

  const { isLoading: isConfirmingTransfer } = useWaitForTransactionReceipt({
    hash: transferHash,
    query: {
      select(data) {
        refetchBalance();
        return data;
      },
    },
  });

  const allowance = React.useMemo<number>(
    () =>
      !allowanceData || !tokenInfo
        ? 0
        : Number(
            formatUnits(allowanceData as bigint, tokenInfo?.decimals as number)
          ),
    [allowanceData, tokenInfo]
  );

  const balance = React.useMemo<number>(
    () =>
      !balanceData || !tokenInfo
        ? 0
        : Number(
            formatUnits(balanceData as bigint, tokenInfo?.decimals as number)
          ),
    [balanceData, tokenInfo]
  );

  const isAddressInvalid =
    targetAddress.value.length > 0 && !targetAddress.isValid;

  return (
    <Box maxW="32rem" w="100%" px={4}>
      <Card>
        <CardHeader textAlign="center">
          <Heading>Transfer</Heading>
        </CardHeader>
        <Box as="form" method="post">
          <CardBody>
            <TokenSelect />
            <FormControl mt={2}>
              <FormLabel
                htmlFor="allowance"
                fontWeight="bold"
                fontSize="sm"
                color="blackAlpha.800"
              >
                Allowance:
              </FormLabel>
              <NumberInput min={0} value={allowance} isDisabled>
                <NumberInputField
                  name="allowance"
                  readOnly
                  _disabled={{
                    opacity: 1,
                    cursor: "not-allowed",
                    bg: "blackAlpha.100",
                  }}
                />
              </NumberInput>
            </FormControl>
            <FormControl mt={2}>
              <FormLabel
                htmlFor="allowance"
                fontWeight="bold"
                fontSize="sm"
                color="blackAlpha.800"
              >
                Balance:
              </FormLabel>
              <NumberInput min={0} value={balance}>
                <NumberInputField name="balance" readOnly />
              </NumberInput>
            </FormControl>
            <FormControl mt={12} isInvalid={isAddressInvalid}>
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
              {isAddressInvalid ? (
                <FormErrorMessage>Address is not valid!</FormErrorMessage>
              ) : (
                <>
                  {targetAddress.isValid ? (
                    <FormHelperText>Validated Address!</FormHelperText>
                  ) : (
                    <FormHelperText>
                      Enter the address you want to transfer tokens to.
                    </FormHelperText>
                  )}
                </>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel
                htmlFor="amount"
                fontWeight="bold"
                fontSize="sm"
                color="blackAlpha.800"
              >
                Amount:
              </FormLabel>
              <NumberInput min={0} max={balance}>
                <NumberInputField
                  onChange={(e) => setAmount(Number(e.target.value))}
                  value={amount}
                  name="amount"
                />
              </NumberInput>
              <FormHelperText>
                Enter the amount of tokens to transfer.
              </FormHelperText>
            </FormControl>
          </CardBody>
          <CardFooter gap={4}>
            <Button
              type="button"
              colorScheme="yellow"
              w="full"
              isLoading={isApproving || isConfirmingApproval}
              isDisabled={
                !isConnected ||
                !targetAddress.isValid ||
                isApproving ||
                isConfirmingApproval ||
                (allowance >= amount && allowance > 0) ||
                !token
              }
              onClick={() => approve()}
            >
              Approve
            </Button>
            <Button
              type="button"
              colorScheme="blue"
              w="full"
              isLoading={isTransferring || isConfirmingTransfer}
              isDisabled={
                !isConnected ||
                !targetAddress.isValid ||
                isTransferring ||
                isConfirmingTransfer ||
                allowance < amount ||
                !amount ||
                !token
              }
              onClick={() => transfer()}
            >
              Transfer
            </Button>
          </CardFooter>
        </Box>
      </Card>
    </Box>
  );
}
