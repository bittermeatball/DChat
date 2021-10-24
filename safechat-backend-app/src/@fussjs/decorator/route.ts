import 'reflect-metadata';
import { CONTROLLER_SYMBOL, ROUTES_SYMBOL } from './constant';

export type RouteMethod = 'get' | 'post' | 'put' | 'delete';

export interface IRoute {
  method: RouteMethod;
  path: string;
  methodName: string | symbol;
}

export const Controller = (basePath: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(CONTROLLER_SYMBOL, basePath, target);
  };
};

export const BaseRouteDecorator =
  (method: RouteMethod) =>
  (path = '/'): MethodDecorator => {
    return (target, propKey) => {
      if (!Reflect.hasMetadata(ROUTES_SYMBOL, target.constructor)) {
        Reflect.defineMetadata(ROUTES_SYMBOL, [], target.constructor);
      }

      const routes: IRoute[] = Reflect.getMetadata(
        ROUTES_SYMBOL,
        target.constructor,
      );

      routes.push({
        method,
        methodName: propKey,
        path,
      });
    };
  };

export const Get = BaseRouteDecorator('get');
export const Post = BaseRouteDecorator('post');
export const Put = BaseRouteDecorator('put');
export const Delete = BaseRouteDecorator('delete');
