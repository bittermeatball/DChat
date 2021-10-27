import { INITIAL_BALANCE } from '../constant';
import { TransactionType } from '../interface/transaction';
import { ChainUtil } from '../util/chain.util';
import { RfRChain } from '../core/chain';
import { Transaction } from './transaction';

export class Wallet {
  public balance;
  public keyPair;
  public publicKey;

  constructor(secret: string) {
    console.log(secret);

    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair(secret);
    this.publicKey = this.keyPair.getPublic('hex');
    console.log(this.publicKey);
  }

  toString() {
    return `Wallet - 
        publicKey: ${this.publicKey.toString()}
        balance  : ${this.balance}`;
  }

  sign(dataHash: string) {
    return this.keyPair.sign(dataHash).toHex();
  }

  createTransaction(
    to: string,
    amount: number,
    type: TransactionType,
    blockchain: RfRChain,
  ) {
    this.balance = this.getBalance(blockchain);
    if (amount > this.balance) {
      console.log(
        `Amount: ${amount} exceeds the current balance: ${this.balance}`,
      );
      return;
    }
    const transaction = Transaction.newTransaction(this, to, amount, type);
    if (!transaction) {
      console.log('Can not create transaction');
      return;
    }
    return transaction;
  }

  getBalance(blockchain: RfRChain) {
    return blockchain.getBalance(this.publicKey);
  }
}
