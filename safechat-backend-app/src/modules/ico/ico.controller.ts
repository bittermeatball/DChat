import { Request, Response } from 'express';
import { p2pServer } from 'src/config/p2p.config';
import { Chain } from 'src/config/rfr.config';
import { transactionPool, wallet } from 'src/config/transaction.config';
import { Controller, Get, Post } from '../../@fussjs/decorator/route';

@Controller('/v1/ico')
export class ICOController {
  @Get('/transactions')
  public getTransactions(request: Request, response: Response) {
    return response.json({
      transactions: transactionPool.transactions,
    });
  }

  @Get('/blocks')
  public getBlocks(request: Request, response: Response) {
    return response.json(Chain.blocks);
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
    if (transactionPool.thresholdReached()) {
      const block = Chain.createBlock(transactionPool.transactions, wallet);
      p2pServer.broadcastBlock(block);
    }
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

  @Get('/balance-of')
  public getBalanceOf(request: Request, response: Response) {
    return response.json({
      balance: Chain.getBalance(request.body.publicKey),
    });
  }
}
