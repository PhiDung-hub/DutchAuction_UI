"use client";

import { useAccount } from 'wagmi';
import BidEntry from '~/components/BidEntry';
import { useState, useEffect } from "react";
import { Bid, collectBids } from '~/lib/blockchain/watch';

export default function Info() {
  const { address } = useAccount();
  const [bids, setBids] = useState<Bid[] | any[]>([]);

  // fetch bids
  useEffect(() => {
    if (address) {
      const getBid = async () => {
        const myBids = (await collectBids({})).filter(bid => bid.bidder === address?.toLowerCase());
        myBids.sort((b1, b2) => Number(b2.block) - Number(b1.block));
        setBids(myBids);
      }
      getBid();
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-4xl">
        Your Bid History
      </div>

      <div className="max-w-5xl bg-black/25 max-h-[60vh] overflow-y-scroll w-full my-12 rounded-xl">
        {bids.map(({amount, block, txHash}) => <BidEntry amount={amount} bidHash={txHash} status="FILLED" block={block} />)}
      </div>
    </div>
  );
}
