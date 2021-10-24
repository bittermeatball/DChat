import { ChainUtil, hash } from './encrypt';
import { Transaction } from './transaction';
import { Wallet } from './wallet';

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
    const timestamp = 0;
    return new Block(
      timestamp,
      '',
      hash(timestamp, '', 'first-block'),
      'first-block',
    );
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

  static signTransaction(transaction: Transaction, senderWallet: Wallet) {
    transaction.input = {
      timestamp: Date.now(),
      from: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.output)),
    };
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
