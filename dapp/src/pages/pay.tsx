import RecipientDetails from "@/components/RecipientDetails";
import ScanQR from "@/components/ScanQR";
import { VStack } from "@chakra-ui/react";

export default function Pay() {
  return (
    <VStack>
      <h1>Pay</h1>
      <ScanQR />
      <h2>or</h2>
      <RecipientDetails />
    </VStack>
  )
}