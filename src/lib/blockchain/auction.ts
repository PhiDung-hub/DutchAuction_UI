import { DutchAuctionABI } from "../abi/DutchAuction";
import { read_client } from "./client";
import { AUCTION_CONTRACT } from "./constants";

/////////////// Auction Contract //////////////
export const DutchAuction = {
  address: AUCTION_CONTRACT,
  abi: DutchAuctionABI,
};


export async function getAuctionPrice() {
  return read_client
    .readContract({
      ...DutchAuction,
      functionName: "getCurrentPrice",
      args: [],
    }).then(r => r as bigint);
}

export async function getRemainingSupply() {
  try {
    const remainingSupply = await read_client
      .readContract({
        ...DutchAuction,
        functionName: "getCurrentTokenSupply",
        args: [],
      }).then(r => r as bigint);
    return remainingSupply;
  } catch (e) {
    return null; // either call error or contract not initialized
  }
}

/** 
* Each user has limited allowance (~10% total_supply). 
* This function calculated `remainingAllowance = maxAllowance - boughtAmount`
**/
export async function getUserRemainingAllowance(address: `0x${string}`) {
  return read_client
    .readContract({
      ...DutchAuction,
      functionName: "getRemainingAllowance",
      args: [address],
    })
    .then((result) => BigInt(result as string));
}

export async function getTimeRemaining(): Promise<number | null> {
  const expectedEndTime = await read_client.readContract({
    ...DutchAuction,
    functionName: "endTime",
  }).then(r => Number(r));

  const now = Date.now() / 1000;

  const timeRemaining = Math.ceil(expectedEndTime - now);

  if (timeRemaining < 0) {
    return null;
  }

  return timeRemaining;
}

// READ PARAMS
export const readAuctionStartTime = {
  ...DutchAuction,
  functionName: "startTime",
}

export const readAuctionStartPrice = {
  ...DutchAuction,
  functionName: "startPrice",
}

export const readAuctionReservePrice = {
  ...DutchAuction,
  functionName: "reservePrice",
}

export const readAuctionDuration = {
  ...DutchAuction,
  functionName: "duration",
};

export const readAuctionTotalsupply = {
  ...DutchAuction,
  functionName: "initialTokenSupply",
};

export const readMaxWeiPerBidder = {
  ...DutchAuction,
  functionName: "maxWeiPerBidder",
};

export function bidParams({ amount }: { amount: bigint }) {
  return {
    ...DutchAuction,
    functionName: "bid",
    args: [],
    value: amount,
  }
}

export const withdrawParams = {
  ...DutchAuction,
  functionName: "withdraw",
}
