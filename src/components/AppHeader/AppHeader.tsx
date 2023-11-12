"use client";

import { FC } from 'react';
import HeaderLinks from './HeaderLinks';
import ConnectWallet from '../ConnectWallet';
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import {
  useNetwork,
} from 'wagmi'

const AppHeader: FC<{}> = () => {
  const { chain } = useNetwork();

  useEffect(() => {
    if (chain && chain.id !== 11155111) {
      toast.error("Please connect to Sepolia testnet", { position: 'top-right' });
    }
  }, [chain]);

  return (
    <div className="z-[10] top-0 sticky flex items-center justify-between w-full bg-gray-900 mb-12">
      <HeaderLinks />
      <div className='top-0 right-0 absolute'>
        <ConnectWallet/>
      </div>
    </div>
  );
};

export default AppHeader;

