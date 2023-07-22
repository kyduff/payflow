import { VStack, Button, Stat, StatNumber, StatLabel, StatHelpText, Text } from "@chakra-ui/react";

export default function RecipientDetailsRendered({ amount, iban, companyName, memo }: {amount: any, iban: any, companyName: any, memo: any}) {

  // TODO: use orderDetails setter to update order details in parent

  return (
    <VStack>
      <Text fontSize={"xl"} as={"b"}>{memo}</Text>
      <Text fontSize={"4xl"} as={"b"}>&euro;{parseInt(amount).toFixed(2)}</Text>
      <Text><i>to:</i> {companyName}</Text>
      <Text fontSize={"xs"}>{iban}</Text>
    </VStack>
  )
}