import { Input, VStack } from "@chakra-ui/react";

export default function RecipientDetails({ setOrderDetails }: {setOrderDetails: any}) {

  // TODO: use orderDetails setter to update order details in parent

  return (
    <VStack>
      <Input placeholder="Account holder"/>
      <Input placeholder="IBAN"/>
      <Input placeholder="Amount"/>
      <Input placeholder="Reference"/>
    </VStack>
  )
}