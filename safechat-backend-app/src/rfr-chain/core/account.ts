import { Block } from './block';
import { Transaction } from '../wallet/transaction';
import { INITIAL_BALANCE } from '../constant';

export class Account {
  public balance: Record<string, number> = {};

  initialize(address: string, balance = INITIAL_BALANCE) {
    if (!this.balance[address]) {
      this.balance[address] = balance;
    }
  }

  transfer(from: string, to: string, amount: number) {
    this.initialize(from);
    this.initialize(to);
    this.increment(to, amount);
    this.decrement(from, amount);
  }

  increment(to: string, amount: number) {
    this.balance[to] += amount;
  }

  decrement(from: string, amount: number) {
    this.balance[from] -= amount;
  }

  getBalance(address: string) {
    this.initialize(address);
    return this.balance[address];
  }

  update(transaction: Transaction) {
    const amount = transaction.output.amount;
    const from = transaction.input.from;
    const to = transaction.output.to;
    this.transfer(from, to, amount);
  }

  transferFee(block: Block, transaction: Transaction) {
    const amount = transaction.output.fee;
    const from = transaction.input.from;
    const to = block.validator;
    this.transfer(from, to, amount);
  }
}
