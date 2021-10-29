import { Transaction } from '../wallet/transaction';

export class Validators {
  public list: string[] = [];

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
