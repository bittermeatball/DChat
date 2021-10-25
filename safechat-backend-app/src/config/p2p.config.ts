import { P2PServer } from 'src/p2p';
import { Chain } from './rfr.config';
import { transactionPool, wallet } from './transaction.config';

export const p2pServer = new P2PServer(Chain, transactionPool, wallet);
