import { TRANSACTION_THRESHOLD } from '../constant';
import { Transaction } from './transaction';

export class TransactionPool {
  public transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  thresholdReached() {
    if (this.transactions.length >= TRANSACTION_THRESHOLD) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @throws Error relate to threshold full
   */
  addTransaction(transaction: Transaction): void {
    if (this.thresholdReached()) {
      throw new Error('Transaction pool is full now');
    }
    this.transactions.push(transaction);
  }

  validTransactions() {
    return this.transactions.filter((transaction) => {
      if (!Transaction.verifyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.input?.from}`);
        return;
      }

      return transaction;
    });
  }

  transactionExists(transaction: Transaction): boolean {
    return this.transactions.some((t) => t.id === transaction.id);
  }

  clear() {
    this.transactions = [];
  }
}
