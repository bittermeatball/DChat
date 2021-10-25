import { Transaction } from '../wallet/transaction';

export class Stake {
  public addresses: string[];
  public balance: Record<string, number>;

  constructor() {
    this.addresses = [];
    this.balance = {};
  }

  initialize(address: string) {
    if (this.balance[address] == undefined) {
      this.balance[address] = 0;
      this.addresses.push(address);
    }
  }

  addStake(from: string, amount: number) {
    this.initialize(from);
    this.balance[from] += amount;
  }

  getBalance(address: string) {
    this.initialize(address);
    return this.balance[address];
  }

  getMax(addresses: string[]) {
    const balance = -1;
    let leader = undefined;
    addresses.forEach((address) => {
      if (this.getBalance(address) > balance) {
        leader = address;
      }
    });
    return leader;
  }

  update(transaction: Transaction) {
    const amount = transaction.output.amount;
    const from = transaction.input.from;
    this.addStake(from, amount);
  }
}
