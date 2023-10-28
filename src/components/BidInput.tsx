import { ETHER_SYMBOL } from "~/lib/constants";
import { SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { formatDecimal } from "~/lib/format";

export type InputProps = {
  currentPrice: number;
  amount: number;
  setAmount: (value: SetStateAction<number>) => void;
  maxAmount: number;
  buttonLabel: string;
  className?: string;
  ariaLabel?: string
}

export default function BidInput({
  amount, setAmount, maxAmount, currentPrice,
  buttonLabel, className,
  ariaLabel
}: InputProps) {
  return (
    <div aria-label={ariaLabel ?? "Price input"}>
      <div className="text-center text-2xl">
        <div className="flex justify-center pt-8 px-4">
          <span
            className="w-[10rem] border border-r-0 border-white/20 rounded-tl-md p-2 bg-v3-bg"
          >
            Amount
          </span>
          <input
            className="w-[7rem] border border-white/20 text-center rounded-tr-md p-2 bg-transparent"
            value={amount > 0 ? formatDecimal(amount, 1) : ''}
            onChange={(e) => {
              const stringValue = e.target.value;
              let value = parseFloat(stringValue);
              if (isNaN(value)) {
                setAmount(0);
              } else if (value >= 0 && value < maxAmount) {
                setAmount(value);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === '-' || event.key === '+') {
                event.preventDefault();  // Prevent input
              }
            }}
            type="number"
            min="1"
            max={maxAmount}
          />
        </div>

        <div
          aria-label="Bid Price"
          className="flex justify-center px-4 w-full"
        >
          <span
            className="w-[10rem] border border-r-0 border-t-0 border-white/20 p-2 bg-v3-bg"
          >
            Price ({ETHER_SYMBOL})
          </span>

          <input
            className="w-[7rem] border border-t-0 border-white/20 text-center p-2 bg-v3-bg/20"
            value={amount > 0 ? formatDecimal(amount * currentPrice, 3) : ''}
            onChange={(e) => {
              const stringValue = e.target.value;
              let value = parseFloat(stringValue) / currentPrice;
              if (isNaN(value)) {
                setAmount(0);
              } else if (value >= 0 && value < maxAmount) {
                setAmount(value);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === '-' || event.key === '+') {
                event.preventDefault();  // Prevent input
              }
            }}
            type="number"
            min="1"
            max={maxAmount * currentPrice}
          />
        </div>
      </div>

      <div className="group flex justify-center">
        <button
          className="w-[17rem] p-4 border border-t-0 border-white/20 
          rounded-b-md bg-v3-bg/50"
          onClick={() => alert("Bid")}
        >
          <span className={twMerge(
            "text-3xl font-bold text-v3-primary group-hover:animate-pulse",
            className ?? "",
          )}>
            {buttonLabel}
          </span>
        </button>
      </div>
    </div>
  )
}

