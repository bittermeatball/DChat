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

  // TODO: we need to validate before push transaction
  addTransaction(transaction: Transaction): boolean {
    this.transactions.push(transaction);
    return this.thresholdReached();
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

  transactionExists(transaction: Transaction) {
    const exists = this.transactions.find((t) => t.id === transaction.id);
    return exists;
  }

  clear() {
    this.transactions = [];
  }
}
