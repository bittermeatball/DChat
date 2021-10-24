import { Request, Response } from 'express';
import { Controller, Post } from '../../@fussjs/decorator/route';

@Controller('/v1/auth')
export class UserController {
  @Post('/')
  public getAll(request: Request, res: Response) {
    return res.json({
      msg: 'Hello',
    });
  }
}
