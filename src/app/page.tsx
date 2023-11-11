"use client";

import SexyText from "~/components/SexyText";
import { useEffect, useState } from 'react';
import { getCurrentBlock } from "~/lib/blockchain/core";
import AuctionUI from "~/views/auction";
import Link from "next/link";
import { EXPLORER_URL } from "~/lib/blockchain/constants";
import { TOKEN_SYMBOL } from "~/lib/constants";

export default function Home() {
  const [block, setBlock] = useState(0n);

  // Update current block number.
  useEffect(() => {
    const fetchBlock = async () => {
      await getCurrentBlock().then((currentBlock) => setBlock(currentBlock));
    };
    fetchBlock();
    const fetchInterval = setInterval(fetchBlock, 12_000);

    return () => clearInterval(fetchInterval);
  }, []);

  return (
    <>
      <CoolIntro />
      <div className="flex justify-center">
        <div className="max-w-5xl bg-black/25 w-full my-12 rounded-xl">
          <div className="my-8">
            <AuctionUI />
          </div>

          <div className="flex justify-between items-center w-full text-right p-4">
            <Link className="text-center text-xl hover:text-v3-primary/80" href="/info">
              My Bids 🔗
            </Link>
            <a
              className="text-green-400 hover:animate-pulse"
              rel="noreferrer noopener"
              target="_blank"
              href={`${EXPLORER_URL}/block/${block.toString()}`}
            >
              {`⬤ ${block === 0n ? '...' : block}`}
            </a>
          </div>
        </div>
      </div>
    </>

  )
}

function CoolIntro() {
  return (
    <div className="flex flex-col justify-center items-center text-center mt-4">
      <div className="flex space-x-2">
        <SexyText className="text-4xl font-semibold px-0 pb-2">
          Dutch Auction
        </SexyText>
        <div className="text-black px-1 py-0.5 bg-v3-primary rounded-md ml-2.5 font-semibold flex text-md self-start">
          v1
        </div>
      </div>

      <div className="text-[#9D9DA6] max-w-[60vw] text-md mt-4 heading-[24px]">
        Demo Dutch Auction for Tulip Token [{TOKEN_SYMBOL}]
      </div>
    </div>
  )
}
