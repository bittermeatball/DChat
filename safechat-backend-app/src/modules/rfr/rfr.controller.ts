import { Request, Response } from 'express';
import { Chain } from 'src/config/rfr.config';
import { Controller, Get, Post } from '../../@fussjs/decorator/route';

@Controller('/v1/chain')
export class RFRController {
  @Post('/mine')
  public mine(request: Request, res: Response) {
    Chain.addBlock(request.body);
    return res.json({
      msg: 'Hello',
    });
  }

  @Get('/blocks')
  public getBlocks(request: Request, res: Response) {
    return res.json({
      blocks: Chain.blocks,
    });
  }
}
