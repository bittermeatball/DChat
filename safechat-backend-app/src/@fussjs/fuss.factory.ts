import 'dotenv/config';
import express, { Express } from 'express';
import { ModuleResolver } from './resolver/module.resolver';

export class FussFactory {
  private constructor(private app: Express) {}

  public static create() {
    return new FussFactory(express());
  }

  public addController(controller: any) {
    const moduleResolver = new ModuleResolver();
    moduleResolver.resolve(this.app, controller);
    return this;
  }

  public run(port: number) {
    this.app.listen(port, () => {
      console.log(`App is listening on port: ${port}`);
    });
  }
}
