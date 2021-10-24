import { INITIAL_BALANCE } from '../constant';
import { BlockChain } from '../interface/blockchain';
import { TransactionType } from '../interface/transaction';
import { ChainUtil } from './encrypt';
import { Transaction } from './transaction';
import { TransactionPool } from './transaction-pool';

export class Wallet {
  public balance;
  public keyPair;
  public publicKey;

  constructor(secret: string) {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair(secret);
    this.publicKey = this.keyPair.getPublic('hex');
  }

  toString() {
    return `Wallet - 
        publicKey: ${this.publicKey.toString()}
        balance  : ${this.balance}`;
  }

  sign(dataHash: string) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(
    to: string,
    amount: number,
    type: TransactionType,
    blockchain: BlockChain,
    transactionPool: TransactionPool,
  ) {
    const transaction = Transaction.newTransaction(this, to, amount, type);
    if (transaction) {
      transactionPool.addTransaction(transaction);
      return transaction;
    }
    throw new Error('Can not create transaction');
  }
}
