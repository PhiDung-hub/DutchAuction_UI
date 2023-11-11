import Modal from 'react-modal';
import React, { Suspense } from 'react';
import { WalletMenu } from '~/views/wallets';
import { useAccount } from 'wagmi';

import { truncateAddress } from '~/lib/format';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    background: 'transparent',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    padding: '0'
  },
};


export default function ConnectWallet() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { address, isConnected } = useAccount()

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className='group bg-gray-800/50'>
      {/* NOTE: padding is adjusted based on text size (height = 28px) and scroll size (8px) */}
      <button className="text-lg text-white/60 group-hover:text-white pl-4 pr-6 py-4 font-bold" onClick={openModal}>
        {address ? truncateAddress(address) : 'Connect Wallet'}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // @ts-ignore
        style={customStyles}
        contentLabel="Wallet Modal"
      >
        <WalletMenu closeModal={closeModal} />
      </Modal>
    </div>
  )
}

