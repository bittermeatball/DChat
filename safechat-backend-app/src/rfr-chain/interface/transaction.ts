export type TransactionType = 'stake' | 'validator' | 'transaction';

export interface Transaction {
  id: string;
  type: TransactionType;
  input: {
    timestamp: number;
    from: string;
    signature: string;
  };
  output: {
    to: string;
    amount: number;
    fee: number;
  };
}
