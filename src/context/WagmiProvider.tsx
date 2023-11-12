"use client";

import { WagmiConfig } from 'wagmi'

import React from 'react'
import { config } from "./config";


// Pass config to React Context Provider
export default function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  )
}

