import { BlockChain } from '../interface/blockchain';
import { Block } from './block';

export class RfRChain implements BlockChain {
  public blocks: Block[];

  constructor() {
    this.blocks = [Block.genesis()];
  }

  replaceChain(newChain: Block[]) {
    if (newChain.length <= this.blocks.length) {
      console.log('Recieved chain is not longer than the current chain');
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log('Recieved chain is invalid');
      return;
    }

    console.log('Replacing the current chain with new chain');
    this.blocks = newChain;
  }

  addBlock(data: any) {
    const block = Block.createBlock(this.blocks[this.blocks.length - 1], data);
    this.blocks.push(block);
  }

  isValidChain(chain: Block[]) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

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
}
