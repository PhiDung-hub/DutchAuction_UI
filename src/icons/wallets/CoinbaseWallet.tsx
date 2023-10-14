import React from 'react';

const CoinbaseWalletIcon: React.FC<React.SVGAttributes<SVGElement>> = ({ width = '20', height = '20' }) => {
  return (
    <svg width={width} height={height} viewBox="1 1 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        fill="#1652F0" 
        d="M1.492 10.419a8.93 8.93 0 0 1 8.93-8.93h11.163a8.93 8.93 0 0 1 8.93 8.93v11.163a8.93 8.93 0 0 1-8.93 8.93H10.422a8.93 8.93 0 0 1-8.93-8.93V10.419z"/><path fill="#fff" fill-rule="evenodd" d="M15.998 26.049c-5.549 0-10.047-4.498-10.047-10.047 0-5.548 4.498-10.046 10.047-10.046 5.548 0 10.046 4.498 10.046 10.046 0 5.549-4.498 10.047-10.046 10.047z" clip-rule="evenodd"/><path fill="#1652F0" d="M12.762 14.254a1.49 1.49 0 0 1 1.489-1.489h3.497c.822 0 1.488.666 1.488 1.489v3.497c0 .822-.666 1.488-1.488 1.488h-3.497a1.488 1.488 0 0 1-1.489-1.488v-3.498z"
      />
    </svg>
  );
};

export default CoinbaseWalletIcon;
