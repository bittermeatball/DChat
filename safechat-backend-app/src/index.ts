import { FussFactory } from './@fussjs/fuss.factory';
import { UserController } from './modules/user/user.controller';
import { setupWeb3 } from './modules/web3/config';

setupWeb3();
FussFactory.create().addController(UserController).run(3000);
