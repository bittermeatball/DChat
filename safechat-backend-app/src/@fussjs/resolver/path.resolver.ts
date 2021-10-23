import { glob } from 'glob';

export class PathResolver {
  constructor(private collectPattern: string) {}

  public collect() {
    const paths = glob.sync(this.collectPattern);
    console.log(paths);
    paths.map(async (path: string) => {
      const module = await import(path);
      console.log(module);
    });
  }
}
