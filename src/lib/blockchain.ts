export function truncateAddress(address: `0x${string}`) {
  // Check if the address starts with "0x" and is 42 characters long (2 for "0x" + 40 for the address)
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error('Invalid Ethereum address.');
  }

  const prefix = address.substring(0, 5); // "0x" + first 3 characters
  const suffix = address.substring(38);   // Last 4 characters

  return `${prefix}...${suffix}`;
}

