import { Log, formatEther, parseAbi } from "viem";
import { read_client } from "./client";
import { AUCTION_CONTRACT, EVT_BID } from "./constants";
import { formatDecimal } from "../format";


export async function collectBids({
  // contract genesis, no evt prior to this
  fromBlock = 4671900n,
  toBlock = undefined
}: { fromBlock?: bigint, toBlock?: bigint }) {
  const logs = await read_client.getLogs({
    address: AUCTION_CONTRACT,
    events: parseAbi([
      EVT_BID
    ]),
    fromBlock,
    toBlock
  });

  return logs.map(log => decodeBidEvent(log));
}

export type Bid = {
  idder: string,
  amount: string,
  block: bigint,
  txHash: `0x${string}`
}

export function decodeBidEvent(log: Log) {
  const { data, blockNumber, transactionHash } = log;

  const trimmed0x = data.slice(2);

  const arg0 = trimmed0x.slice(0, 64);
  const arg1 = trimmed0x.slice(64, 2 * 64)

  return {
    bidder: bytes32ToAddress(arg0)!, // number, very unlikely to overflow
    amount: formatDecimal(Number(formatEther(bytes32ToBigint(arg1))), 3), // collection
    block: blockNumber!,
    txHash: transactionHash!,
  }
}

export function bytes32ToAddress(bytes32: string): `0x${string}` {
  return `0x${bytes32.slice(24)}`
}

/**
 * @warn WARNING: overflow can happen, use `bytes32ToBigint` for guaranteed safety.
 * */
export function bytes32ToNumber(bytes32: string): number | null {
  const bigInteger = BigInt(`0x${bytes32}`);
  const numberValue = Number(bigInteger);

  return Number.isSafeInteger(numberValue) ? numberValue : null
}

export function bytes32ToBigint(bytes32: string): bigint {
  return BigInt(`0x${bytes32}`)
}


