import { VStack, Button } from "@chakra-ui/react";

export default function RecipientDetailsRendered({ amount, iban, companyName, memo }: {amount: any, iban: any, companyName: any, memo: any}) {

  // TODO: use orderDetails setter to update order details in parent

  return (
    <VStack>
  <Button leftIcon={<span>IBAN:</span>} border='2px'
  borderColor='green.500' size='sm'>
    {iban}
  </Button>
  <Button leftIcon={<span>TRANSFER TO: </span>}border='2px'
  borderColor='green.500' size='sm'>
    {companyName}
  </Button>
  <Button rightIcon={<span>&euro;</span>} border='2px'
  borderColor='green.500' size='sm'>
    {amount}
  </Button>[2]
  <Button leftIcon={<span>REF:</span>} border='2px'
  borderColor='green.500' size='sm'>
    {memo}
  </Button>
    </VStack>
  )
}