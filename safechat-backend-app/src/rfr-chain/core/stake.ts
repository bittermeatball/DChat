import { Transaction } from '../wallet/transaction';

export class Stake {
  // Public keys
  public addresses: string[];
  public balance: Record<string, number>;

  constructor() {
    this.addresses = [
      '5e3077e18eec495aff6e69c4ef98f821a04ce826fb0701c54e90f0308944fdf7',
      'c3d76826f9f8fd1c05cb6f215c45aef68f5e722f50f43ab2999693c4fcb1a1da',
      'cf1afd2c7c8e1cf76a5beb21d17e5399f7af383fd61210358b841698613c5b2d',
    ];
    this.balance = {
      '5e3077e18eec495aff6e69c4ef98f821a04ce826fb0701c54e90f0308944fdf7': 0,
      c3d76826f9f8fd1c05cb6f215c45aef68f5e722f50f43ab2999693c4fcb1a1da: 0,
      cf1afd2c7c8e1cf76a5beb21d17e5399f7af383fd61210358b841698613c5b2d: 0,
    };
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
