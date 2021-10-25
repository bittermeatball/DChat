import { FussFactory } from './@fussjs/fuss.factory';
import { p2pServer } from './config/p2p.config';
import { ICOController } from './modules/ico/ico.controller';

p2pServer.listen();

FussFactory.create()
  .addController(ICOController)
  .run(Number.parseInt(process.env.PORT ?? '4000'));
