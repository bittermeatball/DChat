import { TRANSACTION_FEE } from '../constant';
import { TransactionType } from '../interface/transaction';
import { ChainUtil } from '../util/chain.util';
import { Wallet } from './wallet';

export interface InputTransaction {
  timestamp: number;
  from: string;
  signature: any;
}

export interface OutputTransaction {
  to: string;
  amount: number;
  fee: number;
}

export class Transaction {
  public id: string = ChainUtil.id();
  public type: TransactionType = 'stake';
  public input: InputTransaction = {} as InputTransaction;
  public output: OutputTransaction = {} as OutputTransaction;

  static newTransaction(
    senderWallet: Wallet,
    to: string,
    amount: number,
    type: TransactionType,
  ) {
    if (amount + TRANSACTION_FEE > senderWallet.balance) {
      console.log(`Amount : ${amount} exceeds the balance`);
      return;
    }
    console.log('Before generate transaction');

    return Transaction.generateTransaction(senderWallet, to, amount, type);
  }

  static generateTransaction(
    senderWallet: Wallet,
    to: string,
    amount: number,
    type: TransactionType,
  ) {
    const transaction = new this();
    transaction.type = type;
    transaction.output = {
      to: to,
      amount: amount - TRANSACTION_FEE,
      fee: TRANSACTION_FEE,
    };
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  static signTransaction(transaction: Transaction, senderWallet: Wallet) {
    transaction.input = {
      timestamp: Date.now(),
      from: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.output)),
    };
  }

  static verifyTransaction(transaction: Transaction) {
    return ChainUtil.verifySignature(
      transaction.input.from,
      transaction.input.signature,
      ChainUtil.hash(transaction.output),
    );
  }
}
