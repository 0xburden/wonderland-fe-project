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

export function TransferForm() {
  return (
    <Box maxW={72} w="100%">
      <Card>
        <CardHeader textAlign="center">
          <Heading>Transfer</Heading>
        </CardHeader>
        <CardBody>
          <Box as="form" method="post">
            <FormControl>
              <FormLabel
                htmlFor="targetAddress"
                fontWeight="bold"
                fontSize="sm"
                color="blackAlpha.800"
              >
                Target Wallet:
              </FormLabel>
              <Input name="targetAddress" />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel htmlFor="allowance" fontWeight="bold" fontSize="sm" color="blackAlpha.800">
                Allowance:
              </FormLabel>
              <NumberInput min={0}>
                <NumberInputField name="allowance" readOnly />
              </NumberInput>
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
