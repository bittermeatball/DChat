import { SHA256 } from 'crypto-js';

export function hash(timestamp: number, lastHash: string, data: any) {
  return SHA256(`${timestamp}${lastHash}${data}`).toString();
}
