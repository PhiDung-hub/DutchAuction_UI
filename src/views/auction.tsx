"use client";

import classNames from "classnames";
import { useEffect, useState } from "react"
import PriceChart from "~/components/AuctionChart";
import SwapIcon from "~/icons/SwapIcon";
import { DUTCH_AUCTION_INTERVAL, ETHER_SYMBOL, MAX_INDIVIDUAL_SUPPLY } from "~/lib/constants";
import { getAuctionPrice } from "~/lib/viems";

export default function AuctionUI() {
  const [price, setPrice] = useState(10n);
  const [priceChange, setPriceChange] = useState(false);
  const [bidValue, setBidValue] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const bidAtCurrentPrice = async () => {
    alert("Bid");
  }

  // NOTE: on price change, update UI & value.
  // Uncomment code when contract is ready
  useEffect(() => {
    const updatePrice = async (notifyUI = true) => {
      const previousPrice = price;
      const currentPrice = price;
      // const currentPrice = await getAuctionPrice();
      // setPrice(currentPrice);

      setActiveIndex(index => index + 1);
      if (previousPrice != currentPrice && notifyUI) {
        setPriceChange(true);
        setTimeout(() => setPriceChange(false), 20_000); // blink the UI for 10s
      }
    };
    // NOTE: Handle URL navigation
    updatePrice(false);


    // NOTE: interval for demo movement only
    const updateHandler = setInterval(updatePrice, DUTCH_AUCTION_INTERVAL / 1000);
    return () => clearInterval(updateHandler);
  }, [])

  return (
    <>
      <div className="my-12 flex justify-center">
        <div className="w-[640px]">
          <PriceChart width={800} height={480} activeIndex={activeIndex} />
        </div>
      </div>
      <div aria-label="Active price" className="text-center mb-4">
        <p className="text-white/80 text-2xl mb-2">Active Price</p>
        <p className="text-v3-primary text-4xl flex gap-4 justify-center">
          <span className="font-bold">{`1 ${ETHER_SYMBOL}`}</span>
          <SwapIcon width={40} height={40} />
          <span
            className={classNames("font-bold", { "!text-red-400 animate-pulse": priceChange })}
          >
            {`${price > 0n ? price : '?'} [X]`}
          </span>
        </p>
      </div>

      <div
        aria-label="Bid input"
        className="flex text-center justify-center pt-4 px-4 text-xl"
      >
        <span
          className="w-[10rem] border border-r-0 border-white/20 rounded-tl-md p-2 bg-v3-bg"
        >
          Amount
        </span>
        <input
          className="w-[7rem] border border-white/20 text-center rounded-tr-md p-2 bg-transparent"
          value={bidValue > 0 ? bidValue : ''}
          onChange={(e) => {
            const value = Number(e.target.value);
            // NOTE: change this to remaining supply of active account
            if (value >= 0 && value < MAX_INDIVIDUAL_SUPPLY) {
              setBidValue(value);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === '-' || event.key === '+') {
              event.preventDefault();  // Prevent input
            }
          }}
          type="number"
          min="1"
          max={MAX_INDIVIDUAL_SUPPLY}
        />
      </div>

      <div
        aria-label="Bid Price"
        className="flex text-center justify-center px-4 text-xl w-full"
      >
        <span
          className="w-[10rem] border border-r-0 border-t-0 border-white/20 p-2 bg-v3-bg"
        >
          Price (Ether {ETHER_SYMBOL})
        </span>

        <span
          className="w-[7rem] border border-t-0 border-white/20 p-2 bg-v3-bg/50"
        >
          {bidValue / Number(price)}
        </span>
      </div>

      <div className="group flex justify-center">
        <button
          className="w-[17rem] px-4 py-2 border border-t-0 border-white/20 
          rounded-b-md bg-v3-bg/50"
          onClick={bidAtCurrentPrice}
        >
          <span className="text-3xl text-white/50 group-hover:animate-pulse group-hover:text-white">Bid</span>
        </button>
      </div>
    </>
  )
}
