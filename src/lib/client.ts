import { createPublicClient, http, parseAbi, parseUnits } from "viem";
import { mainnet } from "viem/chains";

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

