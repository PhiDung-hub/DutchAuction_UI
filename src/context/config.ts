import { createConfig, configureChains, sepolia } from 'wagmi'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const apiKey = process.env.ALCHEMY_API_KEY;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [apiKey ? alchemyProvider({ apiKey }) : publicProvider()],
);

// Set up wagmi config
export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '9df9e91c229564566db7cc1a9f50daf1',
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

