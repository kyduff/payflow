import RecipientDetails from "@/components/RecipientDetails";
import RenderRecipientDetails from "@/components/RenderRecipientDetails";
import ScanQR from "@/components/ScanQR";
import { Button, Heading, VStack } from "@chakra-ui/react";
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
import MoneriumLogin from "@/components/MoneriumLogin";

interface OrderDetails {
  accountHolder: string,
  iban: string,
  amount: string,
  memo: string,
}

const ORDER_KEY = "payflow.orderDetails";
const REFRESH_KEY = "payflow.refreshKey";
const CURRENCY = "eur";
const CHAIN = "polygon";
const NETWORK = "mumbai";
const CLIENT_ID = "efec9397-f584-11ed-8837-1e07284d4ad6"; // Kyle
// const CLIENT_ID = "ef7ce008-287e-11ee-81b4-4a6f281798e0"; // Jan
const REDIRECT_URI = "https://payflow-self.vercel.app/pay/";
// const REDIRECT_URI = "http://localhost:3000/pay/";
const MON_ENV = "sandbox";

export default function Pay({ code, amount, iban, companyName, memo }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  console.log(code);

  const [client, setClient] = useState<MoneriumClient>();
  const [orderDetails, setOrderDetails] = useState<OrderDetails>();
  const { address } = useAccount();

  const { data, signMessageAsync } = useSignMessage();
  const [render, setRender] = useState(false);
  const [iban_rend, setIban] = useState("");
  const [companyName_rend, setCompanyName] = useState("");
  const [amount_rend, setAmount] = useState("");
  const [memo_rend, setMemo] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [placed, setPlaced] = useState<boolean>(false);

  useEffect(() => {
    ; (async () => {

      if (amount && iban && companyName && memo) {
        window.localStorage.setItem(ORDER_KEY, JSON.stringify({
          amount,
          iban,
          companyName,
          memo,
        }))

        setRender(true);
        setIban(iban);
        setCompanyName(companyName);
        setAmount(amount);
        setMemo(memo);

        return;
      } else {
        const localDetails = window.localStorage.getItem(ORDER_KEY);
        if (!localDetails) return;

        const { amount, iban, companyName, memo } = JSON.parse(localDetails);

        setIban(iban);
        setCompanyName(companyName);
        setAmount(amount);
        setMemo(memo);
      }

      const _client = new MoneriumClient(MON_ENV);

      if (code) {
        const _profile = await _client.auth({
          client_id: CLIENT_ID,
          code: code,
          code_verifier: window.localStorage.getItem("codeVerifier"),
          redirect_uri: REDIRECT_URI
        })

        console.log(_profile);
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
    setPlaced(true);

  }

  return (
    <VStack>
      {render ? (
        <VStack>
          <RenderRecipientDetails amount={amount_rend} iban={iban_rend} companyName={companyName_rend} memo={memo_rend} />
          <MoneriumLogin safe="" />
        </VStack>
      ) : (
        placed ? (
          <Heading size='xl'>Order Placed!</Heading>
        ) : (
        <VStack>
          <RenderRecipientDetails amount={amount_rend} iban={iban_rend} companyName={companyName_rend} memo={memo_rend} />
          <Button colorScheme="green" onClick={handlePay}>Pay</Button>
        </VStack>
      ))}
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