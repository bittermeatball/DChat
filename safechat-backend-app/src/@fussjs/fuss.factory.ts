import 'dotenv/config';
import express, { Express } from 'express';
import { PathResolver } from './resolver/path.resolver';

export class FussFactory {
  private constructor(private app: Express) {}

  public static create() {
    return new FussFactory(express());
  }

  public run(port: number) {
    const env = process.env.NODE_ENV;
    const buildFolder = env === 'production' ? 'build' : 'src';
    const fileExtension = env === 'production' ? 'js' : 'ts';

    const pathResolver = new PathResolver(
      `${buildFolder}/**/*.${fileExtension}`,
    );
    pathResolver.collect();
    this.app.listen(port, () => {
      console.log(`App is listening on port: ${port}`);
    });
  }
}
