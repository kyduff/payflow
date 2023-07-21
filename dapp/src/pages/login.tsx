import MoneriumLogin from "@/components/MoneriumLogin";
import { Button, VStack } from "@chakra-ui/react";
import { Web3Button } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Login() {

  const [loaded, setLoaded] = useState<boolean>(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setLoaded(true);
  });

  return (
    <>
      {loaded &&
        <VStack>
          <h1>payflow</h1>
          <Web3Button />
          <div>
            {isConnected && <MoneriumLogin />}
          </div>
        </VStack>
      }
    </>
  )
}