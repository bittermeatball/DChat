import { Transaction } from '../wallet/transaction';

export class Stake {
  // Public keys
  public addresses: string[];
  public balance: Record<string, number>;

  constructor() {
    this.addresses = [];
    this.balance = {};
  }

  initialize(address: string) {
    if (!this.balance[address]) {
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

  /**
   *
   * @param addresses are public keys
   * @returns leader
   */
  getLeader(addresses: string[]): string {
    let leader = addresses[0];

    for (let i = 1; i < addresses.length; i++) {
      const address = addresses[i];
      if (this.getBalance(address) > this.getBalance(leader)) {
        leader = address;
      }
    }

    return leader;
  }

  update(transaction: Transaction) {
    const amount = transaction.output.amount;
    const from = transaction.input.from;
    this.addStake(from, amount);
  }
}
