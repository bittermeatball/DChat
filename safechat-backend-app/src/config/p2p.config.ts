import { P2PServer } from '../p2p';
import { Chain } from './rfr.config';
import { transactionPool } from './transaction.config';

export const p2pServer = new P2PServer(Chain, transactionPool);
