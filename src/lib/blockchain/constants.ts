export const TOTAL_AUCTION_SUPPLY = 10_000;

/** Maximum auction token allowance for an individual (~10% supply) */
export const MAX_INDIVIDUAL_SUPPLY = 1_000;

/** Price change interval of dutch auction in milliseconds */
export const DUTCH_AUCTION_INTERVAL = 60_000;

/** The Dutch auction contract address */
export const AUCTION_CONTRACT: `0x${string}` = "0x7Af467D962eFc7a6D3a107DE2CcE6c9312f1f884";
export const TOKEN_CONTRACT: `0x${string}` = "0x6252cf1805c19F53578a3F47AC4D8AE9398701dc";
export const EVT_BID = "event Bid(address bidder, uint256 amount)";

export const EXPLORER_URL = "https://sepolia.etherscan.io";
