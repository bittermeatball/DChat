import { TransactionPool } from 'src/rfr-chain/wallet/transaction-pool';
import { Wallet } from 'src/rfr-chain/wallet/wallet';

export const wallet = new Wallet('Super Secret');
export const transactionPool = new TransactionPool();
