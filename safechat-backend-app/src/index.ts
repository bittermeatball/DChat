import { FussFactory } from './@fussjs/fuss.factory';
import { UserController } from './modules/user/user.controller';

FussFactory.create().addController(UserController).run(3000);
