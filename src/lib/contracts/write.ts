import { DutchAuction } from "./constants";

import { viem_client } from "../client";

/////////////// Auction Contract //////////////

/** 
* Retrieve active price of the dutch auction.
**/
export async function getAuctionPrice() {
  return viem_client
    .readContract({
      ...DutchAuction,
      // @ts-ignore
      functionName: "getPrice",
      args: [],
    })
    .then((result) => BigInt(result as string));
}

/** 
* Each user has limited allowance (~10% total_supply). 
* This function calculated `remainingAllowance = maxAllowance - boughtAmount`
**/
export async function getUserRemainingAllowance(address: `0x${string}`) {
  return viem_client
    .readContract({
      ...DutchAuction,
      // @ts-ignore
      functionName: "getAllowance",
      args: [address],
    })
    .then((result) => BigInt(result as string));
}
