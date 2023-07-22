import { Button, ButtonGroup, Flex, Link, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { useAccount } from "wagmi"
import { Web3Button } from "@web3modal/react";
import MoneriumLogin from "@/components/MoneriumLogin";
import { use, useState, useEffect } from "react";


export const Header = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { address, isConnected } = useAccount()
  //const { connected: isSafeWalletConnected } = useSafeAppsSDK();
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (loaded &&
    <Flex
      w="full"
      pb={2}
      my={4}
      align="center"
      justify="space-between"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
    >
      <NextLink href="/">
        <Text fontWeight="bold" fontStyle="italic" fontSize="2xl">
          Payflow
        </Text>
      </NextLink>
      <ButtonGroup isAttached gap={2} alignItems="center">
      <Web3Button />

        {address ? (
          <Flex direction="column" align="center" fontSize="sm">
            
          </Flex>
        ) :(
          <></>
        )}
      </ButtonGroup>
    </Flex>
  )
}