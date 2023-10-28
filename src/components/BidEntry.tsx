import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { ETHER_SYMBOL } from "~/lib/constants";
import { formatDate } from "~/lib/format";

export type BidStatus = "ACCEPTED" | "PENDING" | "FAILED";

export default function BidEntry(
  { amount,
    status,
    bidPrice,
    bidTime,
    bidHash
  }: {
    amount: number,
    status: BidStatus,
    bidPrice: number,
    bidTime: Date,
    bidHash?: string
  }
) {
  return (
    <div className="flex text-2xl justify-between p-1 m-4 border-b border-v3-primary/20">
      <div className="font-bold">
        <span>
          {`${amount.toFixed(1)} TL`}
        </span>
        <span className="text-white/50">
          {` [for ${(amount / bidPrice).toFixed(2)} ${ETHER_SYMBOL}]`}
        </span>
        <a
          className="text-xl text-blue-200/50 hover:text-blue-200"
          href={`https://goerli.etherscan.io/tx/${bidHash}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          {` at ${formatDate(bidTime)}`}
        </a>
      </div>
      <div
        className={
          twMerge(
            classNames("font-bold", {
              "text-yellow-200": status === "PENDING",
              "text-red-300": status === "FAILED",
              "text-v3-primary": status === "ACCEPTED",
            })
          )
        }>
        {status}
      </div>
    </div >
  )
}
