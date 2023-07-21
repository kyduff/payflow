import { getEthersSigner } from "@/utils/EthersProvider";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { MoneriumPack } from '@safe-global/onramp-kit';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { type WalletClient, getWalletClient } from '@wagmi/core'
import { useNetwork } from "wagmi";

export default function MoneriumLogin() {

  const { chain } = useNetwork();

  const CLIENT_ID = "efec9397-f584-11ed-8837-1e07284d4ad6";
  const SAFE_ADDRESS = "0xa208B9468730A17f7dd575d6762cAde9ebA6b1ec";
  const SIGNER_ADDRESS = "0xb7CF83796d911eD42592a625B95753A3Cfdd7feE";
  const REDIRECT_URL = 'http://localhost:3000/pay/';

  const loginWithMonerium = async function () {


    // Configure Safe SDK
    const provider = await getEthersSigner({ chainId: chain?.id });
    if (!provider) return
    const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: provider.getSigner(SIGNER_ADDRESS) });
    const safeSdk = await Safe.create({
      ethAdapter: ethAdapter,
      safeAddress: SAFE_ADDRESS,
      // isL1SafeMasterCopy: true,
    });


    // Configure Monerium
    const moneriumPack = new MoneriumPack({
      clientId: CLIENT_ID,
      environment: 'sandbox',
    })

    await moneriumPack.init({ safeSdk });

    await moneriumPack.open({
      redirectUrl: REDIRECT_URL,
    })
  }

  return (
    <Button onClick={loginWithMonerium}>
      Login with Monerium
    </Button>
  )
}