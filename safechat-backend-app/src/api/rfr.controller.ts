import { Request, Response } from 'express';
import { p2pServer } from 'src/config/p2p.config';
import { Chain } from 'src/config/rfr.config';
import { transactionPool, wallet } from 'src/config/transaction.config';
import { Controller, Get, Post } from '../@fussjs/decorator/route';

@Controller('/v1/chain')
export class RFRController {
  @Post('/mine')
  public mine(request: Request, res: Response) {
    Chain.addBlock(request.body);
    p2pServer.syncChain();

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

  @Get('/transactions')
  public getTransactions(request: Request, response: Response) {
    return response.json({
      transactions: transactionPool.transactions,
    });
  }

  @Post('/transact')
  public createTransaction(request: Request, response: Response) {
    const { to, amount, type } = request.body;

    const transaction = wallet.createTransaction(
      to,
      amount,
      type,
      Chain,
      transactionPool,
    );
    if (!transaction) {
      return response.json({
        msg: 'Invalid transaction',
      });
    }
    p2pServer.broadcastTransaction(transaction);
    return response.json({
      msg: 'Hello dmm',
    });
  }

  @Get('/public-key')
  public getPublicKey(request: Request, response: Response) {
    return response.json({ publicKey: wallet.publicKey });
  }

  @Get('/balance')
  public getBalance(request: Request, response: Response) {
    return response.json({
      balance: Chain.getBalance(wallet.publicKey),
    });
  }
}
