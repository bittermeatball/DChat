import { P2PServer } from './p2p';
import { RfRChain } from './rfr-chain/core/chain';
import { TransactionPool } from './rfr-chain/wallet/transaction-pool';
import { Wallet } from './rfr-chain/wallet/wallet';

class Peer {
  constructor(
    public blockchain: RfRChain,
    public p2pserver: P2PServer,
    public publicwallet: Wallet,
    public transactionPool: TransactionPool,
  ) {}
}
