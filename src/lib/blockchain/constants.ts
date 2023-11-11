export const TOTAL_AUCTION_SUPPLY = 10_000;

/** Maximum auction token allowance for an individual (~10% supply) */
export const MAX_INDIVIDUAL_SUPPLY = 1_000;

/** Price change interval of dutch auction in milliseconds */
export const DUTCH_AUCTION_INTERVAL = 60_000;

/** The Dutch auction contract address */
export const AUCTION_CONTRACT: `0x${string}` = "0xB22c6547A98d70D8A55Dc6bA03d450780dAe0D58";
export const TOKEN_CONTRACT: `0x${string}` = "0xaF1C391C7F9758A096c90c4285ed3Fc69EF7082F";
export const EVT_BID = "event Bid(address bidder, uint256 amount)";

export const EXPLORER_URL = "https://sepolia.etherscan.io";
