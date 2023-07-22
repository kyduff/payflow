import RecipientDetails from "@/components/RecipientDetails";
import { Button, Box } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { useRouter } from "next/router";

import AccordionBalance from "@/components/render_BalanceAccordion";
import tokenNames_poly from '../token_addresses/poly_name';


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

    const [balance1, setBalance1] = useState("");
    const [balance2, setBalance2] = useState("");
    const [balance3, setBalance3] = useState("");
    const [balance4, setBalance4] = useState("");
    const [balance5, setBalance5] = useState("");


    useEffect(() => {
      ;(async () => 
        {
          if (!address) return;
          const balance_array= await display_tokens(address, chain);
          setBalance1(balance_array[0]);
          setBalance2(balance_array[1]);
          setBalance3(balance_array[2]);
          setBalance4(balance_array[3]);
          setBalance5(balance_array[4]);
          console.log(balance_array);
        })();}, []);


    const tokenName_array= tokenNames_poly;    
    

    return (
    <>
      <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {tokenName_array[0]} {balance1}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <Button colorScheme="green">Pay</Button>
        </AccordionPanel>
      </AccordionItem>
    
      <AccordionItem>
      <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {tokenName_array[1]} {balance2}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <Button colorScheme="green">Pay</Button>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
      <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {tokenName_array[2]} {balance3}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <Button colorScheme="green">Pay</Button>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
      <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {tokenName_array[3]} {balance4}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <Button colorScheme="green">Pay</Button>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
      <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {tokenName_array[4]} {balance5}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <Button colorScheme="green">Pay</Button>
        </AccordionPanel>
      </AccordionItem>
     </Accordion>
    </>

    )
}
  
  export const getServerSideProps: GetServerSideProps<{
    code: string | null
  }> = async ({ query }) => {
    const code = query.code as string;
    if (!code) return { props: { code: null } }
    return { props: { code: code } }
  }