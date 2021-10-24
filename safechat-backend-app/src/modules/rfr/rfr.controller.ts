import { Request, Response } from 'express';
import { RfRChain } from 'src/rfr-chain/core/chain';
import { Controller, Get, Post } from '../../@fussjs/decorator/route';

const chain = new RfRChain();

@Controller('/v1/auth')
export class RFRController {
  @Post('/mine')
  public mine(request: Request, res: Response) {
    chain.addBlock(request.body);
    return res.json({
      msg: 'Hello',
    });
  }

  @Get('/blocks')
  public getBlocks(request: Request, res: Response) {
    return res.json({
      blocks: chain.blocks,
    });
  }
}
