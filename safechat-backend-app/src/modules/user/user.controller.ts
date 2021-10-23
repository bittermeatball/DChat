import { Controller, Get } from '@fussjs/decorator/route';
import { Request, Response } from 'express';

@Controller('/v1/users')
export class UserController {
  @Get('/')
  public getAll(request: Request, res: Response) {
    return res.json({
      msg: 'Hello',
    });
  }
}
