import { SECRET, TRANSACTION_TYPE } from '../constant';
import { Account } from './account';
import { Block } from './block';
import { Stake } from './stake';
import { Transaction } from '../wallet/transaction';
import { Validators } from './validator';
import { Wallet } from '../wallet/wallet';

export class RfRChain {
  public blocks: Block[];
  public accounts: Account;
  public stakes: Stake;
  public validators: Validators;

  constructor() {
    this.blocks = [Block.genesis()];
    this.accounts = new Account();
    this.stakes = new Stake();
    this.validators = new Validators();
  }

  replaceChain(newChain: Block[]) {
    if (newChain.length <= this.blocks.length) {
      console.log('Received chain is not longer than the current chain');
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log('Received chain is invalid');
      return;
    }

    console.log('Replacing the current chain with new chain');
    this.resetState();
    this.executeChain(newChain);
    this.blocks = newChain;
  }

  addBlock(data: any) {
    const block = Block.createBlock(
      this.blocks[this.blocks.length - 1],
      data,
      new Wallet(SECRET),
    );

    this.blocks.push(block);
    console.log('NEW BLOCK ADDED');
    return block;
  }

  createBlock(transactions: Transaction[], wallet: Wallet) {
    const block = Block.createBlock(
      this.blocks[this.blocks.length - 1],
      transactions,
      wallet,
    );
    return block;
  }

  isValidChain(chain: Block[]) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      )
        return false;
    }

    return true;
  }

  getLeader() {
    return this.stakes.getMax(this.validators.list);
  }

  getBalance(publicKey: string) {
    return this.accounts.getBalance(publicKey);
  }

  isValidBlock(block: Block) {
    const lastBlock = this.blocks[this.blocks.length - 1];
    /**
     * check hash
     * check last hash
     * check signature
     * check leader
     */
    if (
      block.lastHash === lastBlock.hash &&
      block.hash === Block.blockHash(block) &&
      Block.verifyBlock(block) &&
      Block.verifyLeader(block, this.getLeader())
    ) {
      console.log('block valid');
      this.addBlock(block);
      return true;
    } else {
      return false;
    }
  }

  executeTransactions(block: Block) {
    block.data.forEach((transaction: Transaction) => {
      switch (transaction.type) {
        case TRANSACTION_TYPE.transaction:
          this.accounts.update(transaction);
          this.accounts.transferFee(block, transaction);
          break;
        case TRANSACTION_TYPE.stake:
          this.stakes.update(transaction);
          this.accounts.decrement(
            transaction.input.from,
            transaction.output.amount,
          );
          this.accounts.transferFee(block, transaction);

          break;
        case TRANSACTION_TYPE.validator_fee:
          console.log('VALIDATOR_FEE');
          if (this.validators.update(transaction)) {
            this.accounts.decrement(
              transaction.input.from,
              transaction.output.amount,
            );
            this.accounts.transferFee(block, transaction);
          }
          break;
      }
    });
  }

  executeChain(chain: Block[]) {
    chain.forEach((block) => {
      this.executeTransactions(block);
    });
  }

  resetState() {
    this.blocks = [Block.genesis()];
    this.stakes = new Stake();
    this.accounts = new Account();
    this.validators = new Validators();
  }
}
