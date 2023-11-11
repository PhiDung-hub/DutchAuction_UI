import { AuctionTokenABI } from "../abi/AuctionToken";
import { read_client } from "./client";
import { TOKEN_CONTRACT } from "./constants";

/////////////// Auction Contract //////////////
export const AuctionToken = {
  address: TOKEN_CONTRACT,
  abi: AuctionTokenABI,
};

/** 
* Retrieve auction token balance.
**/
export async function getBalance(address: `0x${string}`) {
  return read_client
    .readContract({
      ...AuctionToken,
      functionName: "balanceOf",
      args: [address],
    }).then(r => r as bigint);
}

export async function getOperator() {
  return read_client
    .readContract({
      ...AuctionToken,
      functionName: "owner",
      args: [],
    }).then(r => r as string);
}

export async function getMaxSupply() {
  return read_client
    .readContract({
      ...AuctionToken,
      functionName: "maxSupply",
      args: [],
    }).then(r => r as bigint);
}

