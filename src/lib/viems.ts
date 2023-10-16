import { createPublicClient, http, parseAbi, parseUnits } from "viem";
import { mainnet } from "viem/chains";
import { AUCTION_CONTRACT } from "./constants";

export const viem_client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

///////////// GENERAL FUNCTIONS /////////////
export async function getBlockTimestamp(blockNumber: number) {
  return viem_client
    .getBlock({ blockNumber: parseUnits(blockNumber.toString(), 0) })
    .then((block) => block.timestamp);
}

export async function getCurrentBlock() {
  return viem_client.getBlock().then((block) => block.number);
}

export async function getERC20TokensDecimals(tokenAddresses: `0x${string}`[]) {
  return viem_client
    .multicall({
      contracts: tokenAddresses.map((address) => ({
        address,
        abi: parseAbi([
          // @ts-ignore
          "function decimals() external view returns (uint8)",
        ]),
        functionName: "decimals",
      })),
    })
    .then((results) => {
      if (results.find((r) => r.error)) {
        throw new Error("Invalid token");
      }
      return results.map((token) => Number(token.result));
    });
}
/////////////////////////////////////////////

/////////////// Auction Contract //////////////
const DutchAuction = {
  address: AUCTION_CONTRACT,
  abi: parseAbi([
    // @ts-ignore
    "function lowerTick() external view returns (int24)",
    // @ts-ignore
    "function upperTick() external view returns (int24)",
    // @ts-ignore
    "function getPositionID() external view returns (bytes32)",
    // @ts-ignore
    "function pool() external view returns (address)",
  ]),
};

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
