import { Block } from './block';
import { Transaction } from '../wallet/transaction';

export class Account {
  public balance: Record<string, number> = {
    '5e3077e18eec495aff6e69c4ef98f821a04ce826fb0701c54e90f0308944fdf7': 1000,
    c3d76826f9f8fd1c05cb6f215c45aef68f5e722f50f43ab2999693c4fcb1a1da: 200,
    cf1afd2c7c8e1cf76a5beb21d17e5399f7af383fd61210358b841698613c5b2d: 500,
  };

  initialize(address: string, balance = 0) {
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
