"use client";

import SexyText from "~/components/SexyText";
import { useEffect, useState } from 'react';
import { getCurrentBlock } from "~/lib/client";
import AuctionUI from "~/views/auction";

export default function Home() {
  const [block, setBlock] = useState(0n)

  // NOTE: DEMO USAGE of viem client: fetch block status
  useEffect(() => {
    const fetcher = async () => {
      await getCurrentBlock().then((currentBlock) => setBlock(currentBlock));
    };
    fetcher();
    const fetchInterval = setInterval(fetcher, 12_000);

    return () => clearInterval(fetchInterval);
  }, [])

  return (
    <>
      <CoolIntro />
      <div className="flex justify-center">
        <div className="max-w-5xl bg-black/25 w-full my-12 rounded-xl">
          <div className="my-8">
            <AuctionUI />
          </div>

          <div className='group w-full self-end items-end text-right p-4'>
            <a
              className='text-green-400 group-hover:animate-pulse'
              rel='noreferrer noopener'
              target='_blank'
              href={`https://etherscan.io/block/${block.toString()}`}
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
        Short Description
      </div>
    </div>
  )
}

