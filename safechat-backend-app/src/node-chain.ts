import { FussFactory } from './@fussjs/fuss.factory';
import { p2pServer } from './config/p2p.config';
import { RFRController } from './api/rfr.controller';

p2pServer.listen();

FussFactory.create()
  .addController(RFRController)
  .run(Number.parseInt(process.env.PORT ?? '3000'));
