import { Request, Response } from 'express';
import { p2pServer } from '../config/p2p.config';
import { Chain } from '../config/rfr.config';
import { transactionPool } from '../config/transaction.config';
import { Wallet } from '../rfr-chain/wallet/wallet';
import { Controller, Get, Post } from '../@fussjs/decorator/route';
import { ERROR_CODE, PUBLIC_TOKEN_HEADER } from './constant';

@Controller('/v1/chain')
export class RFRController {
  @Get('/blocks')
  public getBlocks(req: Request, res: Response) {
    return res.json({
      data: {
        blocks: Chain.blocks,
      },
    });
  }

  @Get('/transactions')
  public getTransactions(req: Request, res: Response) {
    return res.json({
      data: {
        transactions: transactionPool.transactions,
      },
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
    // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

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
      return res.status(400).json({
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

  @Post('/login')
  public login(req: Request, res: Response) {
    // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const data = req.body;

    if (!data.username) {
      return res.status(400).json({
        code: 'PAYLOAD_SUCK',
        message: 'You are missing username in the body',
      });
    }

    const wallet = new Wallet(data.username);

    if (!p2pServer.walletManager.getWalletByPublicKey(wallet.publicToken)) {
      return res.status(400).json({
        code: 'PAYLOAD_SUCK',
        message: 'Your username is not exist. You need to login first',
      });
    }

    return res.status(201).json({
      data: {
        publicToken: wallet.publicToken,
      },
      message: 'This is your key to communicate with others',
    });
  }

  // Sender must cost a fee to get what he wants
  @Get('/account')
  public search(req: Request, res: Response) {
    const ownerPublicToken = req.headers[PUBLIC_TOKEN_HEADER];
    const { s: username } = req.query;

    const publicToken = p2pServer.walletManager.getPublicKeyBySearchUser(
      username as string,
    );

    if (!publicToken) {
      return res.status(400).json({
        code: 'INVALID_USERNAME',
        message: `${username} does not exist`,
      });
    }

    // const wallet = p2pServer.walletManager.getWalletByPublicKey(publicToken);

    // const transaction = wallet.createTransaction(
    //   ownerPublicToken as string,
    //   10,
    //   'transaction',
    //   Chain,
    // );

    // if (!transaction) {
    //   return res.status(400).json({
    //     code: ERROR_CODE.CREATE_TRANSACTION_FAIL,
    //     message: 'Can not create transaction',
    //   });
    // }

    // p2pServer.broadcastTransaction(transaction, wallet);

    return res.status(200).json({
      data: {
        publicToken,
      },
    });
  }

  // Sender must cost a fee to get what he wants
  @Get('/account/:publicToken')
  public retrieveUser(req: Request, res: Response) {
    const { publicToken } = req.params;
    const ownerPublicToken = req.headers[PUBLIC_TOKEN_HEADER] as string;

    if (!ownerPublicToken) {
      return res.status(400).json({
        code: ERROR_CODE.BAD_HEADER,
        message: 'Missing header own-public-key',
      });
    }

    const username =
      p2pServer.walletManager.extractUserLocationByPublicToken(publicToken);

    // const wallet = p2pServer.walletManager.getWalletByPublicKey(publicToken);

    // const transaction = wallet.createTransaction(
    //   ownerPublicToken,
    //   10,
    //   'transaction',
    //   Chain,
    // );

    // if (!transaction) {
    //   return res.status(400).json({
    //     code: 'CREATE_TRANSACTION_FAILED',
    //     message: 'Can not create transaction',
    //   });
    // }

    // p2pServer.broadcastTransaction(transaction, wallet);

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
