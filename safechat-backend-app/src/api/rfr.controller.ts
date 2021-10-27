import { Request, Response } from 'express';
import { p2pServer } from 'src/config/p2p.config';
import { Chain } from 'src/config/rfr.config';
import { transactionPool } from 'src/config/transaction.config';
import { Wallet } from 'src/rfr-chain/wallet/wallet';
import { Controller, Get, Post } from '../@fussjs/decorator/route';

@Controller('/v1/chain')
export class RFRController {
  @Get('/blocks')
  public getBlocks(req: Request, res: Response) {
    return res.json({
      blocks: Chain.blocks,
    });
  }

  @Get('/transactions')
  public getTransactions(req: Request, res: Response) {
    return res.json({
      transactions: transactionPool.transactions,
    });
  }

  // @Post('/transact')
  // public createTransaction(req: Request, res: Response) {
  //   const { to, amount, type, pubKey } = req.body;

  //   const wallet = p2pServer.walletManager.findWalletByKey(pubKey);

  //   if (!wallet) {
  //     return res.json({
  //       msg: 'Invalid pubKey',
  //     });
  //   }

  //   const transaction = wallet.createTransaction(to, amount, type, Chain);

  //   if (!transaction) {
  //     return res.json({
  //       msg: 'Invalid transaction',
  //     });
  //   }
  //   if (!transactionPool.transactionExists(transaction)) {
  //     console.log(Chain.getLeader(), wallet.publicKey);

  //     if (!transactionPool.thresholdReached()) {
  //       transactionPool.addTransaction(transaction);
  //     } else {
  //       if (Chain.getLeader() === wallet.publicKey) {
  //         console.log('Creating block');
  //         const block = Chain.createBlock(transactionPool.transactions, wallet);
  //         p2pServer.broadcastBlock(block, wallet);
  //       }
  //     }
  //   }
  // }

  /**
   * TODO:
   * - Get data from client and generate a key point to that data
   * - Send the pub key back to client
   * - When client send that key to be that we can take that data and send to client
   */
  @Post('/account')
  public createAccount(req: Request, res: Response) {
    const data = req.body;

    const wallet = new Wallet(data);

    const publicToken = p2pServer.walletManager.addWallet(wallet, data);
    console.log('Public token:  ' + publicToken);

    p2pServer.blockchain.accounts.initialize(wallet.publicKey);

    return res.status(201).json({
      key: publicToken,
      message: 'This is your key to communicate with others',
    });
  }

  @Get('/account/:publicToken')
  public retrieveUserLocation(req: Request, res: Response) {
    const { publicToken } = req.params;

    const location =
      p2pServer.walletManager.extractUserLocationByPublicToken(publicToken);

    if (location) {
      return res.status(201).json({
        location,
      });
    }

    return res.status(201).json({
      message: 'Your publicToken is invalid',
    });
  }
}
