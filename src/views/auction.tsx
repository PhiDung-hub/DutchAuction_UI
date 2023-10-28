"use client";

import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react"
import BidInput from "~/components/BidInput";
import PriceChart from "~/components/PriceChart";
import Timer from "~/components/Timer";
import SwapIcon from "~/icons/SwapIcon";
import { ETHER_SYMBOL, TOKEN_SYMBOL } from "~/lib/constants";
import { DUTCH_AUCTION_INTERVAL, MAX_INDIVIDUAL_SUPPLY, TOTAL_AUCTION_SUPPLY } from "~/lib/contracts/constants";

export default function AuctionUI() {
  const [price, setPrice] = useState(10);
  const [priceChange, setPriceChange] = useState(false);
  const [bidValue, setBidValue] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1200);
  const [supplyRemaining, setSupplyRemaining] = useState(965);

  // NOTE: on price change, update UI & value.
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
    const updateHandler = setInterval(updatePrice, DUTCH_AUCTION_INTERVAL / 5);
    return () => clearInterval(updateHandler);
  }, [])

  return (
    <>
      <div className="pl-12 my-8 flex justify-center">
        <div className="w-[640px]">
          <PriceChart
            width={800}
            height={480}
            activeIndex={activeIndex}
            title={`Auction Price - ${TOKEN_SYMBOL} / ${ETHER_SYMBOL}`}
            xLabel="Time"
            yLabel={`${TOKEN_SYMBOL} Price`}
          />
        </div>
        <div aria-label="Auction stats" className="flex w-[100px]">
          <Timer duration={timeRemaining} />
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="mb-2 font-bold text-xl text-white/80">
          Supply Remaining
        </div>
        <div className="text-3xl">
          <span className="text-v3-primary">
            {`${supplyRemaining}${TOKEN_SYMBOL}`}
          </span>
          <span className="text-white/60">
            {` [${(100 * supplyRemaining / TOTAL_AUCTION_SUPPLY).toFixed(1)}%]`}
          </span>
        </div>
      </div>

      <BidInput
        amount={bidValue}
        setAmount={setBidValue}
        maxAmount={MAX_INDIVIDUAL_SUPPLY}
        currentPrice={price}
        ariaLabel="Bid Input"
        buttonLabel="BID"
      />

      <div aria-label="Active price" className="text-center my-4">
        <p className="text-white/80 text-xl mb-2">Current Price</p>
        <p className="text-white/80 text-2xl mb-2 flex gap-4 justify-center">
          <span className="font-bold">{`1 ${ETHER_SYMBOL}`}</span>
          <SwapIcon width={32} height={32} />
          <span
            className={classNames("text-v3-primary font-bold", { "!text-red-400 animate-pulse": priceChange })}
          >
            {`${price > 0n ? price : '?'}${TOKEN_SYMBOL}`}
          </span>
        </p>
      </div>

      <div className="my-8 flex justify-center">
        <button className="group p-4 border rounded-md border-white/20 bg-v3-bg/80">
          <Link className="text-center text-xl hover:text-v3-primary/80" href="/info">
            My Bids 🔗
          </Link>
        </button>
      </div>
    </>
  )
}
