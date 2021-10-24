import { FussFactory } from './@fussjs/fuss.factory';
import { RFRController } from './modules/rfr/rfr.controller';

FussFactory.create()
  .addController(RFRController)
  .run(Number.parseInt(process.env.PORT ?? '3000'));
