import { Request, Response } from 'express';
import { p2pServer } from '../config/p2p.config';
import { Chain } from '../config/rfr.config';
import { transactionPool } from '../config/transaction.config';
import { Wallet } from '../rfr-chain/wallet/wallet';
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

  // When create we need to send to the chain this transaction
  @Post('/account')
  public createAccount(req: Request, res: Response) {
    const data = req.body;

    if (!data.username) {
      return res.status(400).json({
        code: 'PAYLOAD_SUCK',
        message: 'You are missing username in the body',
      });
    }

    const wallet = new Wallet(data.username);

    const publicToken = p2pServer.walletManager.addWallet(
      wallet,
      data.username,
    );

    if (!publicToken) {
      return res.status(201).json({
        code: 'INVALID_USERNAME',
        message: 'This username has been used',
      });
    }

    console.log('Public token:  ' + publicToken);

    p2pServer.blockchain.accounts.initialize(wallet.publicKey);

    return res.status(201).json({
      data: {
        publicToken,
      },
      message: 'This is your key to communicate with others',
    });
  }

  // Sender must cost a fee to get what he wants
  @Get('/account')
  public search(req: Request, res: Response) {
    const { s: username } = req.query;

    const publicKey = p2pServer.walletManager.getPublicKeyBySearchUser(
      username as string,
    );

    return res.status(200).json({
      data: {
        publicKey: publicKey,
      },
    });
  }

  // Sender must cost a fee to get what he wants
  @Get('/account/:publicToken')
  public retrieveUser(req: Request, res: Response) {
    const { publicToken } = req.params;

    const username =
      p2pServer.walletManager.extractUserLocationByPublicToken(publicToken);

    if (username) {
      return res.status(200).json({
        data: {
          username,
        },
      });
    }

    return res.status(400).json({
      code: 'BAD_PARAM',
      message: 'Your publicToken is invalid',
    });
  }
}
