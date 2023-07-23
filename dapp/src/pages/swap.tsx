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
import tokenPrices_poly from "../utils/fx_rates/polygon";
import tokenNames_gno from '../token_addresses/gnosis_names';
import tokenAddresses_gno from '../token_addresses/gnosis_add';
import tokenPrices_gno from "../utils/fx_rates/gnosis";


import { sellToEURe } from "@/utils/1inch/sell";


import { getEthersSigner } from "@/utils/EthersProvider";
import { ethers } from "ethers";
import { MoneriumPack, SafeMoneriumClient } from '@safe-global/onramp-kit';
import { type WalletClient, getWalletClient } from '@wagmi/core'
import { useNetwork, useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { display_tokens } from "@/components/fetch_tokens";



export default function handleSwap({ amountEur, handlePay }: { amountEur: number, handlePay: any }) {

  const { chain } = useNetwork();
  const { address } = useAccount();

  const [balances, setBalances] = useState([]);
  const [chain_id, setChainId] = useState<number>(0);
  const [placed_swap, setPlacedSwap] = useState<boolean>(false);
  const [tokenName_array, setTokenNameArray] = useState<string[]>([]);
  const [tokenFX_array, setTokenFXArray] = useState<number[]>([]);

  // change this to the actual euros wished to be swapped
  const eur_swap = amountEur;

  useEffect(() => {
    ; (async () => {
      if (!address) return;
      const balance_array = await display_tokens(address, chain);
      const chain_id = chain?.id;
      if (!chain_id) return;

      setChainId(chain_id);
      setBalances(balance_array);
      //polygon
      if (chain_id == 137) {
        setTokenNameArray(tokenNames_poly);
        setTokenFXArray(tokenPrices_poly);
      }

      //gnosischain
      else if (chain_id == 100 || chain_id == 10200) {
        setTokenNameArray(tokenNames_gno);
        setTokenFXArray(tokenPrices_gno);
      }
    })();
  }, [chain]);




  const handleSwap = async function (EURe_swap_amount: number, swap_token_ind: number) {

    //convert into wei for selltoEURe call
    // min value for swap hardcoded here for now
    console.log("token_fx:", tokenFX_array[swap_token_ind]);
    //let value_swap = EURe_swap_amount * tokenFX_array[swap_token_ind] * 10 ** 18;
    let value_swap = 0.2 * 1.11*10 ** 18;
    if (value_swap < 10000000000000000) {
      console.log(value_swap);
      value_swap = 10000000000000000;
    }
    if (!address && chain) return;

    const swap_params = {
      chain: chain_id,
      fromAddress: address,
      fromToken: tokenAddresses_gno[swap_token_ind],
      amount: value_swap,
    }

    console.log(swap_params);
    if (!swap_params.fromAddress) return;
    const swap = await sellToEURe(swap_params.chain, swap_params.fromAddress, swap_params.fromToken, swap_params.amount.toString());
    //console.log(swap);

    setPlacedSwap(true);
  }

  const swapAndPay = async function (EURe_swap_amount: number, swap_token_ind: number) {
    await handleSwap(EURe_swap_amount, swap_token_ind);
    await handlePay();
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

            <Button colorScheme="green" onClick={handlePay}>Pay with {tokenName_array[0]}</Button>
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
            <Button colorScheme="green" onClick={() => swapAndPay(eur_swap, 1)} >Pay with {tokenName_array[1]}</Button>
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
            <Button colorScheme="green" onClick={() => swapAndPay(eur_swap, 2)}>Pay with {tokenName_array[2]}</Button>
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
            <Button colorScheme="green" onClick={() => swapAndPay(eur_swap, 3)}>Pay with {tokenName_array[3]}</Button>
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
            <Button colorScheme="green" onClick={() => swapAndPay(eur_swap, 4)}>Pay with {tokenName_array[4]}</Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>

  )
}