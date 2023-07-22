import RecipientDetails from "@/components/RecipientDetails";
import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { getEthersSigner } from "@/utils/EthersProvider";
import { ethers } from "ethers";
import { MoneriumPack, SafeMoneriumClient } from '@safe-global/onramp-kit';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { type WalletClient, getWalletClient } from '@wagmi/core'
import { useNetwork, useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { display_tokens } from "@/components/fetch_tokens";

export default function Swap({ code }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const { chain } = useNetwork();
    const { address } = useAccount();
    const api= display_tokens();

  
    return (
      <VStack>
        <h1>Swap</h1>
        <Button colorScheme="green">Pay</Button>
      </VStack>
    )
  }
  
  export const getServerSideProps: GetServerSideProps<{
    code: string | null
  }> = async ({ query }) => {
    const code = query.code as string;
    if (!code) return { props: { code: null } }
    return { props: { code: code } }
  }