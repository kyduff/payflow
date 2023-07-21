import { Input, VStack } from "@chakra-ui/react";

export default function RecipientDetails() {
  return (
    <VStack>
      <Input placeholder="Account"/>
      <Input placeholder="IBAN"/>
    </VStack>
  )
}