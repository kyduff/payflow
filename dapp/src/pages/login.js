import { Button, VStack } from "@chakra-ui/react";
import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";

export default function Login() {

  const { address, isConnected } = useAccount();

  return (
    <VStack>
      <h1>payflow</h1>
      <Web3Button />
      {isConnected && (
        <Button>Login with Monerium</Button>
      )}
    </VStack>
  )
}