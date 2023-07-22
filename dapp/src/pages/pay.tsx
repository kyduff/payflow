import RecipientDetails from "@/components/RecipientDetails";
import ScanQR from "@/components/ScanQR";
import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { getEthersSigner } from "@/utils/EthersProvider";
import { ethers } from "ethers";
import { MoneriumPack, SafeMoneriumClient } from '@safe-global/onramp-kit';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { type WalletClient, getWalletClient } from '@wagmi/core'
import { useAccount, useNetwork, useSignMessage } from "wagmi";
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

const ORDER_KEY = "payflow.orderDetails";
const REFRESH_KEY = "payflow.refreshKey";
const CURRENCY = "eur";
const CHAIN = "polyon";
const NETWORK = "mumbai";

export default function Pay({ code, amount, iban, companyName, memo }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  console.log(code);

  const [client, setClient] = useState<MoneriumClient>();
  const [orderDetails, setOrderDetails] = useState<OrderDetails>();
  const { address } = useAccount();

  const { data, signMessageAsync } = useSignMessage();



  useEffect(() => {
    ; (async () => {

      if (amount && iban && companyName && memo) {
        window.localStorage.setItem(ORDER_KEY, JSON.stringify({
          amount,
          iban,
          companyName,
          memo,
        }))
      }

      const refresh = window.localStorage.getItem(REFRESH_KEY);
      const _client = new MoneriumClient("sandbox");
      var _profile;

      if (refresh) {
        _profile = await _client.auth({
          client_id: "efec9397-f584-11ed-8837-1e07284d4ad6", // Kyle
          // client_id: "ef7ce008-287e-11ee-81b4-4a6f281798e0", // Jan
          // code: code,
          refresh_token: refresh,
          code_verifier: window.localStorage.getItem("codeVerifier"),
          redirect_uri: "https://payflow-self.vercel.app/pay/"
        })
      } else if (code) {
        _profile = await _client.auth({
          client_id: "efec9397-f584-11ed-8837-1e07284d4ad6", // Kyle
          // client_id: "ef7ce008-287e-11ee-81b4-4a6f281798e0", // Jan
          code: code,
          // refresh_token: refresh,
          code_verifier: window.localStorage.getItem("codeVerifier"),
          redirect_uri: "https://payflow-self.vercel.app/pay/"
        })
      } else {
        console.log("no code");
        return;
      }

      console.log(_profile.refresh_token)

      if (_profile.refresh_token) {
        window.localStorage.setItem(REFRESH_KEY, _profile.refresh_token)
      }

      setClient(_client);
    })();
  }, [code]);

  const handlePay = async function () {

    // TODO: place order and subscribe to order status
    const localDetails = window.localStorage.getItem(ORDER_KEY);
    if (!localDetails) return;

    const { amount, iban, companyName, memo } = JSON.parse(localDetails);

    console.log({ amount, iban, companyName, memo });

    const message = formatMessage(CURRENCY, amount, iban, new Date())
    const signature = await signMessageAsync({ message })

    const order = {
      address: address,
      amount: amount,
      chain: CHAIN,
      counterpart: {
        details: {
          companyName
        },
        identifier: {
          iban: iban,
          standard: "iban",
        }
      },
      message: message,
      memo: memo,
      network: NETWORK,
      signature: signature,
    }

    console.log(order);

    const orderRes = await client.placeOrder(order);
    console.log(orderRes);

    // TODO: on complete, clear local storage

  }

  return (
    <VStack>
      <h1>Pay</h1>
      <ScanQR />
      <h2>or</h2>
      <RecipientDetails setOrderDetails={setOrderDetails} />
      <Button colorScheme="green" onClick={handlePay}>Pay</Button>
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps<{
  code: string | null,
  amount: string | null,
  iban: string | null,
  companyName: string | null,
  memo: string | null,
}> = async ({ query }) => {
  const code = query.code as string;

  const amount = query.amount as string;
  const iban = query.iban as string;
  const companyName = query.companyName as string;
  const memo = query.memo as string;

  const _prop = {
    code: (!code) ? null : code,
    amount: (!amount) ? null : amount,
    iban: (!iban) ? null : iban,
    companyName: (!companyName) ? null : companyName,
    memo: (!memo) ? null : memo,
  }

  return { props: _prop }
}