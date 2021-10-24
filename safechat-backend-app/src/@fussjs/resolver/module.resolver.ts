import 'reflect-metadata';
import { Router, Express } from 'express';
import { CONTROLLER_SYMBOL, ROUTES_SYMBOL } from '@fussjs/decorator/constant';
import { IRoute } from '@fussjs/decorator/route';

export class ModuleResolver {
  private router: Router = Router();

  public resolve(app: Express, controller: any): void {
    const instance = new controller();
    const basePath = Reflect.getMetadata(CONTROLLER_SYMBOL, controller);

    const routers: IRoute[] = Reflect.getMetadata(ROUTES_SYMBOL, controller);
    routers.forEach((router) => {
      this.router[router.method](router.path, instance[router.methodName]);
      console.log(
        `[${controller.name}] mapping: ${router.method} ${basePath}${router.path}`,
      );
    });

    app.use(basePath, this.router);
  }
}
