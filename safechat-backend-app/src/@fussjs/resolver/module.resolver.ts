import { Router } from 'express';

export class ModuleResolver {
  private router: Router = Router();

  public resolve(controller: any): Router {
    console.log(controller);
    this.router.get('/', (req) => {
      console.log('Hello');
    });
    return this.router;
  }
}
