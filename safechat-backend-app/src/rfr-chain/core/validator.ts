import { Transaction } from '../wallet/transaction';

export class Validators {
  public list: string[] = [
    '5e3077e18eec495aff6e69c4ef98f821a04ce826fb0701c54e90f0308944fdf7',
    'c3d76826f9f8fd1c05cb6f215c45aef68f5e722f50f43ab2999693c4fcb1a1da',
    'cf1afd2c7c8e1cf76a5beb21d17e5399f7af383fd61210358b841698613c5b2d',
  ];

  // Validator will need a fee 25 and there is no output to join validator
  update(transaction: Transaction) {
    console.log(transaction);
    if (transaction.output.amount >= 25 && transaction.output.to == '0') {
      this.list.push(transaction.input.from);
      console.log('New Validator:', transaction.input.from);
      return true;
    }
    return false;
  }
}
