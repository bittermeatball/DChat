import { TRANSACTION_FEE } from '../constant';
import { TransactionType } from '../interface/transaction';
import { ChainUtil } from './encrypt';
import { Wallet } from './wallet';

export class Transaction {
  public id: string = ChainUtil.id();
  public type: TransactionType = 'stake';
  public input: {
    timestamp?: number;
    from?: string;
    signature?: any;
  } = {};
  public output: any;

  static newTransaction(
    senderWallet: Wallet,
    to: string,
    amount: number,
    type: TransactionType,
  ) {
    if (amount + TRANSACTION_FEE > senderWallet.balance) {
      console.log('Not enough balance');
      return;
    }

    return Transaction.generateTransaction(senderWallet, to, amount, type);
  }

  static generateTransaction(
    senderWallet: Wallet,
    to: string,
    amount: number,
    type: TransactionType,
  ) {
    const transaction = new Transaction();
    transaction.type = type;
    transaction.output = {
      to: to,
      amount: amount - TRANSACTION_FEE,
      fee: TRANSACTION_FEE,
    };
    return transaction;
  }

  static verifyTransaction(transaction: Transaction) {
    return ChainUtil.verifySignature(
      transaction.input?.from ?? '',
      transaction.input.signature,
      ChainUtil.hash(transaction.output),
    );
  }
}
