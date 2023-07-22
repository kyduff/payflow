import RecipientDetails from "@/components/RecipientDetails";
import ScanQR from "@/components/ScanQR";
import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { getEthersSigner } from "@/utils/EthersProvider";
import { ethers } from "ethers";
import { MoneriumPack, SafeMoneriumClient } from '@safe-global/onramp-kit';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { type WalletClient, getWalletClient } from '@wagmi/core'
import { useNetwork, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
//@ts-ignore
import { MoneriumClient } from '@monerium/sdk';
import { formatMessage } from "@/utils/formatting";

interface OrderDetails {
  accountHolder: string,
  iban: string,
  amount: string,
  memo: string,
}

export default function Pay({ code }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  console.log(code);

  const [client, setClient] = useState<MoneriumClient>();
  const [orderDetails, setOrderDetails] = useState<OrderDetails>();

  const { data, signMessageAsync } = useSignMessage();

  useEffect(() => {
    ;(async () => {
      if (!code) {
        console.log("no code");
        return;
      }
  
      const _client = new MoneriumClient("production");
  
      await _client.auth({
        // client_id: "efec9397-f584-11ed-8837-1e07284d4ad6", // Kyle
        client_id: "ef7ce008-287e-11ee-81b4-4a6f281798e0", // Jan
        code: code,
        code_verifier: window.localStorage.getItem("codeVerifier"),
        redirect_uri: "http://localhost:3000/pay/"
      })

      setClient(_client);
    })();
  }, [code]);

  const handlePay = async function () {

    // TODO: place order and subscribe to order status
    const balances = await client.getBalances();
    console.log(balances);

    const currency = "eur";
    const amount = "0.5";
    const iban = "DE92 1001 1001 2621 3427 45";

    const message = formatMessage(currency, amount, iban, new Date())
    const signature = await signMessageAsync({message})

    const order = {
      address: "0x02c7BFfEDBBaFa1244dBDd5338b303e7DeD4115D",
      amount: amount,
      chain: "polygon",
      counterpart: {
        details: {
          firstName: "Jan Ole",
          lastName: "Ernst",
        },
        identifier: {
          iban: iban,
          standard: "iban",
        }
      },
      message: message,
      memo: "Inaugural transfer",
      network: "mainnet",
      signature: signature,
    }

    console.log(order);

    client.placeOrder(order);

  }

  return (
    <VStack>
      <h1>Pay</h1>
      <ScanQR />
      <h2>or</h2>
      <RecipientDetails setOrderDetails={setOrderDetails}/>
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