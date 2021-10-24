import { FussFactory } from './@fussjs/fuss.factory';
import { p2pServer } from './config/p2p.config';
import { RFRController } from './modules/rfr/rfr.controller';
import { TransactionPool } from './rfr-chain/core/transaction-pool';
import { Wallet } from './rfr-chain/core/wallet';

p2pServer.listen();

FussFactory.create()
  .addController(RFRController)
  .run(Number.parseInt(process.env.PORT ?? '3000'));
