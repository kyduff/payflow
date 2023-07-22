import { VStack, Button } from "@chakra-ui/react";

export default function RecipientDetailsRendered({ amount, iban, companyName, memo }: {amount: any, iban: any, companyName: any, memo: any}) {

  // TODO: use orderDetails setter to update order details in parent

  return (
    <VStack>
  <Button colorScheme='teal' size='sm'>
    {iban}
  </Button>
  <Button colorScheme='teal' size='sm'>
    {companyName}
  </Button>
  <Button colorScheme='teal' size='sm'>
    {amount}
  </Button>[2]
  <Button colorScheme='teal' size='sm'>
    {memo}
  </Button>
    </VStack>
  )
}