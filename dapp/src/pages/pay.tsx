import RecipientDetails from "@/components/RecipientDetails";
import ScanQR from "@/components/ScanQR";
import { Button, VStack } from "@chakra-ui/react";

export default function Pay() {
  return (
    <VStack>
      <h1>Pay</h1>
      <ScanQR />
      <h2>or</h2>
      <RecipientDetails />
      <Button colorScheme="green">Pay</Button>
    </VStack>
  )
}