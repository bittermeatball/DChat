import { SHA256 } from 'crypto-js';
import { ChainUtil } from '../util/chain.util';
import { Transaction } from '../wallet/transaction';
import { Validators } from './validator';
import { Wallet } from '../wallet/wallet';

export class Block {
  constructor(
    public timestamp: number,
    public lastHash: string,
    public hash: string,
    public data: any,
    public validator: string,
    public signature: string,
  ) {}

  static hash(timestamp: number, lastHash: string, data: any) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static signBlockHash(hash: string, wallet: Wallet) {
    return wallet.sign(hash);
  }

  static genesis() {
    return new this(0, '----', 'genesis-hash', [], '', '');
  }

  static blockHash(block: Block) {
    const { timestamp, lastHash, data } = block;
    return Block.hash(timestamp, lastHash, data);
  }

  static createBlock(lastBlock: Block, _data: any, wallet: Wallet) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const data = [];
    data.push(_data);
    const hash = Block.hash(timestamp, lastHash, data);
    const validator = wallet.publicKey;
    const signature = Block.signBlockHash(hash, wallet);
    return new this(timestamp, lastHash, hash, data, validator, signature);
  }

  static verifyBlock(block: Block) {
    return ChainUtil.verifySignature(
      block.validator,
      block.signature,
      Block.hash(block.timestamp, block.lastHash, block.data),
    );
  }

  static verifyLeader(block: Block, leader: Wallet) {
    return block.validator === leader.publicKey;
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
