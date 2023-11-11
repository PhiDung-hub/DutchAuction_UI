import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

export const read_client = createPublicClient({
  chain: sepolia,
  transport: http(process.env.ALCHEMY_API_KEY),
});
