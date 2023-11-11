import { timeFormat } from '@visx/vendor/d3-time-format';

export const formatDate = timeFormat("%b %d, %y - %H:%M:%S");

export const formatFloat = (n: number, decimals = 3): string => {
  let formatted = n.toFixed(decimals);
  // Remove trailing zeros after the decimal point
  while (formatted.includes('.') && (formatted.endsWith('0') || formatted.endsWith('.'))) {
    formatted = formatted.slice(0, -1);
  }

  return formatted;
}

export function formatISOString(isoString: string): string {
  return isoString.replace('T', ' ').replace('Z', ' UTC');
}

export function formatDecimal(num: number, decimal: number): string | number {
  const parts = num.toString().split('.');

  // Check if there is no decimal part (whole number) or if the decimal part has fewer digits
  if (!parts[1] || parts[1].length <= decimal) {
    return num;
  }
  return num.toFixed(decimal);
}

export function truncateAddress(address: `0x${string}`) {
  // Check if the address starts with "0x" and is 42 characters long (2 for "0x" + 40 for the address)
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error('Invalid Ethereum address.');
  }

  const prefix = address.substring(0, 5); // "0x" + first 3 characters
  const suffix = address.substring(38);   // Last 4 characters

  return `${prefix}...${suffix}`;
}
