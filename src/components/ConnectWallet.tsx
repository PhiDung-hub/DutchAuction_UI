import Modal from 'react-modal';
import React from 'react';
import { WalletMenu } from '~/views/wallets';
import { useAccount } from 'wagmi';

import { truncateAddress } from '~/lib/ethers';

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
    <div>
      <button className='text-white/60 hover:text-white font-bold' onClick={openModal}>
        {isConnected ? truncateAddress(address!) : 'Connect Wallet'}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // @ts-ignore
        style={customStyles}
        contentLabel="Wallet Modal"
      >
        <WalletMenu />
        <button className='text-black' onClick={closeModal}>Close</button>
      </Modal>
    </div>
  )
}

