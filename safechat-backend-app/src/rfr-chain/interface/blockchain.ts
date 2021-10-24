import { Block } from '../core/block';

export interface BlockChain {
  blocks: Block[];
  replaceChain(newChain: Block[]): void;

  addBlock(data: any): void;

  isValidChain(chain: Block[]): boolean;
}
