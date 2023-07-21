import { Input, VStack } from "@chakra-ui/react";

export default function RecipientDetails() {
  return (
    <VStack>
      <Input placeholder="Account holder"/>
      <Input placeholder="IBAN"/>
      <Input placeholder="Amount"/>
      <Input placeholder="Memo"/>
    </VStack>
  )
}