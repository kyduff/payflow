import { getEthersSigner } from "@/utils/EthersProvider";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { MoneriumPack } from '@safe-global/onramp-kit';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { type WalletClient, getWalletClient } from '@wagmi/core'
import { useAccount, useNetwork } from "wagmi";
//@ts-ignore
import { MoneriumClient } from '@monerium/sdk';
import CryptoJS from 'crypto-js';


const REDIRECT_URI = "https://payflow-self.vercel.app/pay/";
// const REDIRECT_URI = "http://localhost:3000/pay/";

// const CLIENT_ID = "efec9397-f584-11ed-8837-1e07284d4ad6"; // Kyle
const CLIENT_ID = "ef7ce008-287e-11ee-81b4-4a6f281798e0"; // Jan

// const MON_ENV = "sandbox";
const MON_ENV = "production";


export default function MoneriumLogin({ safe }: {safe: string}) {

  const loginWithMonerium = async function () {

    const client = new MoneriumClient(MON_ENV);

    const codeVerifier = CryptoJS.lib.WordArray.random(64).toString();
    const codeChallenge = CryptoJS.enc.Base64url.stringify(CryptoJS.SHA256(codeVerifier));

    // Construct the authFlowUrl for your application and redirect your customer.
    let authFlowUrl = client.getAuthFlowURI({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code_challenge: codeChallenge,
      code_challenge_method: "S256"

      // TODO: autofill network details using wagmi
      // network: "mumbai",
      // chain: "polygon",
      // address: "0xValidAddress72413Fa92980B889A1eCE84dD",
      // signature: "0xValidSignature0df2b6c9e0fc067ab29bdbf322bec30aad7c46dcd97f62498a91ef7795957397e0f49426e000b0f500c347219ddd98dc5080982563055e918031c"
    })

    console.log(authFlowUrl);

    window.localStorage.setItem("codeVerifier", client.codeVerifier)

    window.location.replace(authFlowUrl);
  }

  return (
    <Button onClick={loginWithMonerium}>
      Login with Monerium
    </Button>
  )
}