"use client";

import { FC } from 'react';
import HeaderLinks from './HeaderLinks';
import ConnectWallet from '../ConnectWallet';

const AppHeader: FC<{}> = () => {
  return (
    <div className="z-[10] top-0 sticky flex items-center justify-between w-full bg-gray-900 mb-12">
      <HeaderLinks />
      <div className='top-0 right-0 absolute pl-4 pr-6 pt-4 pb-5 bg-gray-800/50'>
        <ConnectWallet/>
      </div>
    </div>
  );
};

export default AppHeader;

