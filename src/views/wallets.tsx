"use client"

import { ReactElement } from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
} from 'wagmi'
import CloseIcon from '~/icons/wallets/CloseIcon'

import CoinbaseWalletIcon from '~/icons/wallets/CoinbaseWallet'
import MetaMaskIcon from '~/icons/wallets/MetaMask'
import WalletConnectIcon from '~/icons/wallets/WalletConnect'
import { truncateAddress } from '~/lib/blockchain'

const iconMap: {
  [key: string]: ReactElement;
} = {
  'MetaMask': <MetaMaskIcon />,
  'Coinbase Wallet': <CoinbaseWalletIcon />,
  'WalletConnect': <WalletConnectIcon />,
}

// TODO: passdown close modal props
export function WalletMenu({ closeModal }: { closeModal: Function }) {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className='flex flex-col items-center justify-center p-5 w-[30rem] rounded-2xl bg-v3-bg'>
        <div className='text-left font-semibold text-white/80 text-xl pb-8'>
          Account: {ensName ? `${ensName} (${truncateAddress(address!)})` : truncateAddress(address!)}
        </div>
        <button
          onClick={() => disconnect()}
          className='block p-4 my-2 w-[15rem] border-gray-700 border-2 rounded-lg text-white/60 hover:text-white bg-slate-700/20'
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className='p-5 w-[30rem] rounded-2xl bg-v3-bg'>
      <div className='flex justify-between'>
        <div className='text-left font-semibold text-white/80 text-xl pb-8'>
          Connect your wallet
          <p className='text-sm text-white/50'>Select your wallet from these supported options</p>
        </div>
        <div onClick={() => closeModal()} className='text-white/50 hover:text-white'>
          <CloseIcon />
        </div>
      </div>
      <div className='flex flex-col pb-8 items-center justify-stretch'>
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => {
              connect({ connector });
              closeModal();
            }}
            className='flex gap-2 p-4 my-2 w-[15rem] border-gray-700 border-2 rounded-lg text-white/60 hover:text-white bg-slate-600/20'
          >
            {iconMap[connector.name]}
            {connector.name}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' ...'}
          </button>
        ))}
      </div>
      {error && <div className='text-red-400/90'>{error.message}</div>}
    </div >
  )
}

