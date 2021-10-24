import { Block } from './block';

class RfRChain {
  private chains: Block[];

  constructor() {
    this.chains = [Block.genesis()];
  }

  addBlock(data: any) {
    const block = Block.createBlock(this.chains[this.chains.length - 1], data);
    this.chains.push(block);

    return block;
  }
}
