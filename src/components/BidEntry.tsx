import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { EXPLORER_URL } from "~/lib/blockchain/constants";
import { formatDecimal } from "~/lib/format";

export type BidStatus = "FILLED" | "PENDING" | "WITHDRAW";

export default function BidEntry(
  { amount,
    status,
    block,
    bidHash
  }: {
    amount: number,
    status: BidStatus,
    block: Date,
    bidHash?: string
  }
) {
  return (
    <div className="flex text-2xl justify-between p-1 m-4 border-b border-v3-primary/20">
      <div className="font-bold">
        <span>
          {`${formatDecimal(amount, 3)} ETH`}
        </span>
        <a
          className="text-xl text-blue-200/50 hover:text-blue-200"
          href={`${EXPLORER_URL}/tx/${bidHash}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          {` at block ${block}`}
        </a>
      </div>
      <div
        className={
          twMerge(
            classNames("font-bold", {
              "text-yellow-200": status === "PENDING",
              "text-red-300": status === "WITHDRAW",
              "text-v3-primary": status === "FILLED",
            })
          )
        }>
        {status}
      </div>
    </div >
  )
}
