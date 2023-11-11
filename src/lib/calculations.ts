export function calculatePriceIndex(startBlock: number, currentBlock: number) {
  if (startBlock > currentBlock) {
    throw new Error("Auction not active")
  }
  return currentBlock - startBlock;
}
