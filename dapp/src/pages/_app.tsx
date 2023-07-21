import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'

// Web3Modal
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygon, goerli, gnosis, polygonMumbai } from 'wagmi/chains'

const chains = [polygon, goerli, gnosis, polygonMumbai]
const projectId = "6b68f87fefde2fdd5ec584b002af170f"

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)


function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default App;