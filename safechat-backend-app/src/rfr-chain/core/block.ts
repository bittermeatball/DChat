import { hash } from './encrypt';

export class Block {
  private validator: any;
  private signature = 'asdsd';

  constructor(
    public timestamp: number,
    public lastHash: string,
    public hash: string,
    public data: any,
  ) {}

  static genesis() {
    return new Block(Date.now(), '', '', '');
  }

  static blockHash(block: Block) {
    const { timestamp, lastHash, data } = block;
    return hash(timestamp, lastHash, data);
  }

  static createBlock(lastBlock: Block, data: any) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const encryptedHash = hash(timestamp, lastHash, data);

    return new Block(timestamp, lastHash, encryptedHash, data);
  }

  toString() {
    return `Block - 
        Timestamp : ${this.timestamp}
        Last Hash : ${this.lastHash}
        Hash      : ${this.hash}
        Data      : ${this.data}
        Validator : ${this.validator}
        Signature : ${this.signature}`;
  }
}
