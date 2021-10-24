import { SHA256 } from 'crypto-js';
import { eddsa as EDDSA } from 'elliptic';
import { v1 as uuidV1 } from 'uuid';

const eddsa = new EDDSA('ed25519');

export function hash(timestamp: number, lastHash: string, data: any) {
  return SHA256(`${timestamp}${lastHash}${data}`).toString();
}

export class ChainUtil {
  static id() {
    return uuidV1();
  }

  static genKeyPair(secret: string) {
    return eddsa.keyFromSecret(secret);
  }

  static hash(data: any) {
    return SHA256(JSON.stringify(data)).toString();
  }

  static verifySignature(
    publicKey: string,
    signature: string,
    dataHash: string,
  ) {
    return eddsa.keyFromPublic(publicKey).verify(dataHash, signature);
  }
}
