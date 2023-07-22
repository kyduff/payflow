import RecipientDetails from "@/components/RecipientDetails";
import ScanQR from "@/components/ScanQR";
import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { getEthersSigner } from "@/utils/EthersProvider";
import { ethers } from "ethers";
import { MoneriumPack, SafeMoneriumClient } from '@safe-global/onramp-kit';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { type WalletClient, getWalletClient } from '@wagmi/core'
import { useNetwork } from "wagmi";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Pay({ code }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { chain } = useNetwork();

  const CLIENT_ID = "efec9397-f584-11ed-8837-1e07284d4ad6";
  // const SAFE_ADDRESS = "0xa208B9468730A17f7dd575d6762cAde9ebA6b1ec"; // Polygon
  const SAFE_ADDRESS = "0x58da951b17Cb5A6449468f21e6887f81BBA73620"; // Gnosis
  const SIGNER_ADDRESS = "0xb7CF83796d911eD42592a625B95753A3Cfdd7feE";
  const REDIRECT_URL = 'http://localhost:3000/pay/';

  console.log(code);

  const handlePay = async function () {

    // Configure Safe SDK
    const provider = await getEthersSigner({ chainId: chain?.id });
    if (!provider) return
    const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: provider.getSigner(SIGNER_ADDRESS) });
    const safeSdk = await Safe.create({
      ethAdapter: ethAdapter,
      safeAddress: SAFE_ADDRESS,
    });

    // Configure Monerium
    const moneriumPack = new MoneriumPack({
      clientId: CLIENT_ID,
      environment: 'sandbox',
    })

    await moneriumPack.init({ safeSdk });

    const safeMoneriumClient = await moneriumPack.open({
      authCode: code as string,
      redirectUrl: REDIRECT_URL,
    });
    console.log(safeMoneriumClient);

    const authContext = await safeMoneriumClient.getAuthContext()
    const profile = await safeMoneriumClient.getProfile(authContext.defaultProfile)
    const balances = await safeMoneriumClient.getBalances()
    const orders = await safeMoneriumClient.getOrders()

    console.log({
      authContext,
      profile,
      balances,
      orders,
    })

  }

  return (
    <VStack>
      <h1>Pay</h1>
      <ScanQR />
      <h2>or</h2>
      <RecipientDetails />
      <Button colorScheme="green" onClick={handlePay}>Pay</Button>
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