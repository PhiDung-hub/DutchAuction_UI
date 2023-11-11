"use client";

import classNames from "classnames";
import { useEffect, useState } from "react"
import BidInput from "~/components/BidInput";
import PriceChart from "~/components/PriceChart";
import Timer from "~/components/Timer";
import { ETHER_SYMBOL, TOKEN_SYMBOL } from "~/lib/constants";
import {
  readAuctionDuration, bidParams, getAuctionPrice, readAuctionReservePrice,
  readAuctionStartPrice, readAuctionStartTime, readAuctionTotalsupply,
  readMaxWeiPerBidder, getUserRemainingAllowance, getRemainingSupply, withdrawParams, auctionIsStarted, getIsAuctioning
} from "~/lib/blockchain/auction";
import { useAccount, useContractReads, useContractWrite, usePrepareContractWrite } from "wagmi";
import { formatEther, parseEther } from "viem";
import { formatDecimal } from "~/lib/format";
import toast from "react-hot-toast";


const demoData = [...Array(100).keys()].map((val, idx) => ({
  date: new Date(Date.now() + 12_000 * idx).toISOString(),
  price: 0.026 - Math.floor(val / 5) * 0.001,
}));

export default function AuctionUI() {
  const { address } = useAccount();
  const [price, setPrice] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [bidValue, setBidValue] = useState(0);

  const [priceChange, setPriceChange] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [remainingSupply, setRemainingSupply] = useState<number | null>(null);
  const [auctionActive, setAuctionActive] = useState<boolean | null>(null);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [remainingAllowance, setRemainingAllowance] = useState<number | null>(null);
  const [maxWei, setMaxWei] = useState<number | null>(null);

  const [auctionData, setAuctionData] = useState<null | typeof demoData>(null);

  const constructAuctionData = ({
    startTime, duration, startPrice, reservePrice
  }: {
    startTime: number, duration: number, startPrice: number, reservePrice: number
  }) => {
    const blocks = duration * 5;
    const priceQuantum = (startPrice - reservePrice) / (duration - 1);
    return [...Array(blocks).keys()].map((block) => ({
      date: new Date(startTime * 1_000 + 12_000 * block).toISOString(),
      price: startPrice - Math.floor(block / 5) * priceQuantum,
    }))
  }

  const { data: auctionStates } = useContractReads({
    contracts: [
      // @ts-ignore
      readAuctionStartTime,
      // @ts-ignore
      readAuctionDuration,
      // @ts-ignore
      readAuctionStartPrice,
      // @ts-ignore
      readAuctionReservePrice,
      // @ts-ignore
      readAuctionTotalsupply,
      // @ts-ignore
      readMaxWeiPerBidder,
    ]
  });

  const fetchAllowance = async (address: `0x${string}`) => {
    const remainingAllowance = formatDecimal(Number(formatEther(await getUserRemainingAllowance(address))), 3);
    setRemainingAllowance(Number(remainingAllowance));
  };
  const { config: bidConfig, error: bidError } = usePrepareContractWrite(bidParams({ amount: parseEther((bidValue * price).toString(), 'wei') }));
  const { write: writeBid, isSuccess: bidSuccess } = useContractWrite(bidConfig);
  const callBid = () => {
    if (bidValue == 0) {
      toast.error("0 bid amount");
      return;
    }
    if (!writeBid) {
      toast.error("Bid error!", { position: 'top-right' });
      return;
    }
    writeBid();
    if (bidError) {
      toast.error("Bid call Revert", { position: 'top-right' });
      console.log(bidError);
    }
  }

  useEffect(() => {
    if (bidSuccess) {
      toast.success("Bid submitted!", { position: "top-right" })
      fetchAllowance(address!);
    }
  }, [bidSuccess]);

  const { config: withdrawConfig, error: withdrawError } = usePrepareContractWrite(withdrawParams);
  const { write: writeWithdraw, isSuccess: withdrawSuccess } = useContractWrite(withdrawConfig);
  const callWithdraw = () => {
    if (!writeWithdraw) {
      toast.error("Not eligible!", { position: 'top-right' });
      return;
    }
    writeWithdraw();
    if (withdrawError) {
      toast.error("Withdraw call Revert", { position: 'top-right' });
      console.log(withdrawError);
    }
  }

  useEffect(() => {
    if (withdrawSuccess) {
      toast.success("Withdraw submitted!", { position: "top-right" })
    }
  }, [withdrawSuccess]);


  // NOTE: on price change, update UI & value.
  useEffect(() => {
    const updatePrice = async () => {
      const previousPrice = price;
      const currentPrice = Number(formatEther(await getAuctionPrice()));
      setPrice(currentPrice);

      if (previousPrice != currentPrice) {
        setPriceChange(true);
        setTimeout(() => setPriceChange(false), 5_000); // blink the UI for 5s
      }
    };
    updatePrice();

    const updateHandler = setInterval(() => {
      updatePrice();
      setActiveIndex(index => index + 1);
    }, 12_000);

    return () => clearInterval(updateHandler);
  }, []);

  useEffect(() => {
    if (address) {
      fetchAllowance(address);
    }
  }, [address]);

  const [isAuctioning, setIsAuctioning] = useState<boolean>(false);


  useEffect(() => {
    const updateRemainingSupply = async () => {
      const remainingSupply = Number(formatDecimal(Number(formatEther(await getRemainingSupply() ?? 0n)), 3));
      setRemainingSupply(remainingSupply);

      const isAuctioning = await getIsAuctioning();
      setIsAuctioning(isAuctioning);
    }
    updateRemainingSupply();
  }, [])


  useEffect(() => {
    const getInitialState = async () => {
      if (auctionStates) {
        const [_startTime, _duration, _startPrice, _reservePrice, _totalSupply, _maxWeiPerBidder] = [
          auctionStates[0].result,
          auctionStates[1].result,
          auctionStates[2].result,
          auctionStates[3].result,
          auctionStates[4].result,
          auctionStates[5].result,
        ];
        const startTime = Number(_startTime);
        const duration = Number(_duration);
        const startPrice = Number(formatEther(_startPrice as bigint));
        const reservePrice = Number(formatEther(_reservePrice as bigint));

        const totalSupply = Number(formatEther(_totalSupply as bigint));
        setTotalSupply(totalSupply);

        const maxWei = Number(formatEther(_maxWeiPerBidder as bigint));
        setMaxWei(maxWei);

        const auctionData = constructAuctionData({ startTime, duration, startPrice, reservePrice });
        setAuctionData(auctionData);

        const isAuctionStarted = await auctionIsStarted();
        setAuctionActive(isAuctionStarted);

        if (isAuctionStarted) {
          const timeRemaining = Math.ceil(startTime + duration * 60 - Date.now() / 1000);
          setTimeRemaining(timeRemaining > 0 ? timeRemaining : 0);
        }

        const activeIndex = Math.floor((Date.now() / 1000 - startTime) / 12);
        setActiveIndex(activeIndex);
      }
    }

    getInitialState();
  }, [auctionStates])

  return (
    <>
      <div className="pl-12 my-8 flex justify-center">
        <div className="w-[40rem]">
          {auctionActive && auctionData?.length ? (
            <PriceChart
              width={800}
              height={480}
              data={auctionData}
              activeIndex={activeIndex}
              title={`${formatDecimal(price, 4)} ${ETHER_SYMBOL} ⇌ 1${TOKEN_SYMBOL}`}
              titleClassName={classNames('', { 'animate-pulse fill-red-300': priceChange })}
              xLabel="Time"
              yLabel={`${TOKEN_SYMBOL} Price`}
            />
          ) : (
            <div className="flex items-center justify-center w-[40rem] h-[30rem] animate-pulse text-4xl">
              ...
            </div>
          )}
        </div>

        {!!timeRemaining && isAuctioning && (
          <div aria-label="Auction stats" className="flex w-[6rem]">
            <Timer duration={timeRemaining} />
          </div>
        )}
        {(!isAuctioning && timeRemaining !== null) && (
          <div className="text-yellow-300 font-bold">
            AUCTION EXPIRED
          </div>
        )}
        {timeRemaining === null && (
          <div className="text-red-300 font-bold">
            NO AUCTION
          </div>
        )}
      </div>


      {(isAuctioning && !!timeRemaining) && (
        <>
          <BidInput
            amount={bidValue}
            setAmount={setBidValue}
            maxAmount={100}
            currentPrice={price}
            ariaLabel="Bid Input"
            buttonLabel="BID"
            onBid={callBid}
          />

          <div className="flex gap-16 justify-center my-8">
            <div aria-label="supply-remaining" className="text-center">
              <div className="mb-2 text-xl text-white/80">
                Auction Token Remaining
              </div>
              <div className="text-2xl font-bold">
                <span className="text-v3-primary/80">
                  {`${remainingSupply}${TOKEN_SYMBOL}`}
                </span>
                <span className="text-white/50">
                  {` [${(totalSupply && remainingSupply) ? (100 * remainingSupply / totalSupply).toFixed(1) : "..."}%]`}
                </span>
              </div>
            </div>

            <div aria-label="supply-remaining" className="text-center">
              <div className="mb-2 text-xl text-white/80">
                Bid Limit Remaining
              </div>
              <div className="text-2xl font-bold">
                <span className="text-v3-primary/80">
                  {`${remainingAllowance} ${ETHER_SYMBOL}`}
                </span>
                <span className="text-white/50">
                  {` [${(maxWei && remainingAllowance) ? (100 * remainingAllowance / maxWei).toFixed(1) : "..."}%]`}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {(!isAuctioning && timeRemaining !== null) && (
        <div className="flex flex-col items-center">
          <div className="text-3xl text-center">
            Auction has not been settled :(
          </div>
          <button
            className="my-4 group w-[17rem] p-4 border border-white/20 rounded-md bg-v3-bg/50"
            onClick={callWithdraw}
          >
            <span className="text-2xl font-bold text-yellow-300/50 group-hover:animate-none group-hover:text-yellow-300">
              Withdraw
            </span>
          </button>

          <span className="text-2xl">
            {"Your commited amount: "}
            <span className="text-v3-primary font-bold">
              {`${(maxWei && remainingAllowance) ? formatDecimal(maxWei - remainingAllowance, 4) : "..."} ${ETHER_SYMBOL}`}
            </span>
          </span>
        </div>
      )}

      {timeRemaining === null && (
        <div className="text-4xl text-center">
          Stay tune for upcoming auction!
        </div>
      )}
    </>
  )
}
