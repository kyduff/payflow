import { type WalletClient, getWalletClient } from '@wagmi/core'
import { providers } from 'ethers'
 
export function walletClientToProvider(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new providers.Web3Provider(transport, network)
  return provider
}
 
/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const walletClient = await getWalletClient({ chainId })
  console.log(walletClient);
  if (!walletClient) return undefined
  return walletClientToProvider(walletClient)
}