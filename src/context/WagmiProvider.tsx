"use client";

import { WagmiConfig, createConfig, configureChains, sepolia } from 'wagmi'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import React from 'react'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  // [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY! })],
  [publicProvider()],
);

// Set up wagmi config
const config = createConfig({
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

// Pass config to React Context Provider
export default function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  )
}

