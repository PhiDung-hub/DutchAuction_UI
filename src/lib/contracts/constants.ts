import {parseAbi } from "viem";

export const TOTAL_AUCTION_SUPPLY = 1000;

/** Maximum auction token allowance for an individual (~10% supply) */
export const MAX_INDIVIDUAL_SUPPLY = 100_000;

/** Price change interval of dutch auction in milliseconds */
export const DUTCH_AUCTION_INTERVAL = 60_000; 

/** The Dutch auction contract address */
export const AUCTION_CONTRACT: `0x${string}` = "0x00000000"; 

export const DutchAuction = {
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

