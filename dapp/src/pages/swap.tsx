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
import tokenAddresses_poly from '../token_addresses/polygon_add';
import tokenPrices_poly from "./fx_rates/polygon";
import tokenNames_gno from '../token_addresses/gnosis_names';
import tokenAddresses_gno from '../token_addresses/gnosis_add';


import { sellToEURe } from "@/utils/1inch/sell";


import { getEthersSigner } from "@/utils/EthersProvider";
import { ethers } from "ethers";
import { MoneriumPack, SafeMoneriumClient } from '@safe-global/onramp-kit';
import { type WalletClient, getWalletClient } from '@wagmi/core'
import { useNetwork, useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { display_tokens } from "@/components/fetch_tokens";



export default function handleSwap({ code }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const { chain } = useNetwork();
    const { address } = useAccount();

    const [balances, setBalances] = useState([]);
    const [chain_id, setChainId] = useState<number>(0);
    const [placed_swap, setPlacedSwap] = useState<boolean>(false);


    useEffect(() => {
      ;(async () => 
        {
          if (!address) return;
          const balance_array= await display_tokens(address, chain);
          const obj: { id?: number } = {chain};
          const chain_id = chain?.id;
          setChainId(chain_id);
          setBalances(balance_array);
        })();}, []);

    //TODO conditional on chain use other token names/exch rates
    const tokenName_array= tokenNames_poly;
    const tokenFX_array= tokenPrices_poly;

  const handleSwap= async function (EURe_swap_amount: number, swap_token_ind: number) {

      //convert into wei for selltoEURe call
      const value_swap = EURe_swap_amount*tokenFX_array[swap_token_ind]*10**18;
      if (!address && chain) return;
  
      const swap_params = {
        chain: 137,
        fromAddress: address,
        fromToken: tokenAddresses_poly[swap_token_ind],
        amount: value_swap,
      }

      console.log(swap_params);
      if (!swap_params.fromAddress) return;
      const swap = await sellToEURe(swap_params.chain, swap_params.fromAddress, swap_params.fromToken, swap_params.amount.toString());
      //console.log(swap);
  
      setPlacedSwap(true);  
    }

    //const test=handleSwap(1, 0);
    
    //the first accordion is always in EURe so no swap, direct payment

    return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {tokenName_array[0]} {balances[0]}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          
        <Button colorScheme="green">Pay with {tokenName_array[0]}</Button>
        </AccordionPanel>
      </AccordionItem>
      
    
      <AccordionItem>
      <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {tokenName_array[1]} {balances[1]}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <Button colorScheme="green" onClick={() => handleSwap(0.01,1)} >Pay with {tokenName_array[1]}</Button>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
      <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {tokenName_array[2]} {balances[2]}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <Button colorScheme="green">Pay with {tokenName_array[2]}</Button>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
      <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {tokenName_array[3]} {balances[3]}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <Button colorScheme="green">Pay with {tokenName_array[3]}</Button>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
      <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {tokenName_array[4]} {balances[4]}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <Button colorScheme="green">Pay with {tokenName_array[4]}</Button>
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