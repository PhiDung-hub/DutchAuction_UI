import { parseUnits } from "viem";

import { read_client } from "./client";

///////////// GENERAL FUNCTIONS /////////////
export async function getBlockTimestamp(blockNumber: number) {
  return read_client
    .getBlock({ blockNumber: parseUnits(blockNumber.toString(), 0) })
    .then((block) => block.timestamp);
}

export async function getCurrentBlock() {
  return read_client.getBlock().then((block) => block.number);
}
