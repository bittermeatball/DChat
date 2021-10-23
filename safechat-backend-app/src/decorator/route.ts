import 'reflect-metadata';
import { CONTROLLER_SYMBOL } from './constant';

export const Controller = (basePath: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(CONTROLLER_SYMBOL, basePath, target);
  };
};
