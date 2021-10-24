import { Transaction } from './transaction';

export class TransactionPool {
  public transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  validTransactions() {
    return this.transactions.filter((transaction: Transaction) => {
      if (!Transaction.verifyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.input.from}`);
        return;
      }

      return transaction;
    });
  }

  transactionExists(transaction: Transaction) {
    const exists = this.transactions.find((t) => t.id === transaction.id);
    return exists;
  }
}
