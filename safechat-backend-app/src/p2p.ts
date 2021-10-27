import WebSocket from 'ws';
import { MESSAGE_TYPE } from './rfr-chain/constant';
import { Block } from './rfr-chain/core/block';
import { RfRChain } from './rfr-chain/core/chain';
import { Transaction } from './rfr-chain/wallet/transaction';
import { TransactionPool } from './rfr-chain/wallet/transaction-pool';
import { Wallet } from './rfr-chain/wallet/wallet';
import { WalletManager } from './rfr-chain/wallet/wallet.manager';

//declare the peer to peer server port
const P2P_PORT = Number.parseInt(process.env.P2P_PORT || '5001');

//list of address to connect to
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

export interface ChainMessageSocket {
  walletSender: Wallet;
  type: keyof typeof MESSAGE_TYPE;
  blocks: Block[];
  transaction: Transaction;
  block: Block;
}

export class P2PServer {
  public sockets: WebSocket[];
  public walletManager: WalletManager;

  constructor(
    public blockchain: RfRChain,
    public transactionPool: TransactionPool,
  ) {
    this.sockets = [];
    this.walletManager = new WalletManager();
  }

  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });

    // event listener and a callback function for any new connection
    // on any new connection the current instance will send the current chain
    // to the newly connected peer
    server.on('connection', (socket) => {
      this.connectSocket(socket);
    });

    // to connect to the peers that we have specified
    this.connectToPeers();

    console.log(`Listening for peer to peer connection on port : ${P2P_PORT}`);
  }

  // after making connection to a socket
  connectSocket(socket: WebSocket) {
    this.sockets.push(socket);
    console.log('Socket connected');
    this.messageHandler(socket);
    this.sendChain(socket);
  }

  connectToPeers() {
    //connect to each peer
    peers.forEach((peer) => {
      // create a socket for each peer
      const socket = new WebSocket(peer);

      // open event listner is emitted when a connection is established
      // saving the socket in the array
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  messageHandler(socket: WebSocket) {
    socket.on('message', (message) => {
      const data = JSON.parse(message as any) as ChainMessageSocket;
      console.log('Received data from peer:', data.type);
      console.log(data);

      switch (data.type) {
        case MESSAGE_TYPE.chain:
          this.blockchain.replaceChain(data.blocks);
          break;

        case MESSAGE_TYPE.transaction:
          const { walletSender } = data;
          if (
            !this.transactionPool.transactionExists(data.transaction) &&
            walletSender
          ) {
            console.log(this.blockchain.getLeader(), walletSender.publicKey);

            if (!this.transactionPool.thresholdReached()) {
              this.transactionPool.addTransaction(data.transaction);
            } else {
              if (this.blockchain.getLeader() === walletSender.publicKey) {
                console.log('Creating block');
                const block = this.blockchain.createBlock(
                  this.transactionPool.transactions,
                  walletSender,
                );
                this.broadcastBlock(block, data.walletSender);
              }
            }
          }

          break;

        case MESSAGE_TYPE.block:
          if (this.blockchain.isValidBlock(data.block)) {
            this.blockchain.addBlock(data.block, data.walletSender);
            this.blockchain.executeTransactions(data.block);
            this.transactionPool.clear();
          }
          break;
      }
    });
  }

  sendChain(socket: WebSocket) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPE.chain,
        blocks: this.blockchain.blocks,
      }),
    );
  }

  syncChain() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }

  broadcastTransaction(transaction: Transaction, walletSender: Wallet) {
    this.sockets.forEach((socket) => {
      this.sendTransaction(socket, transaction, walletSender);
    });
  }

  sendTransaction(
    socket: WebSocket,
    transaction: Transaction,
    walletSender: Wallet,
  ) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPE.transaction,
        transaction,
        walletSender,
      } as ChainMessageSocket),
    );
  }

  broadcastBlock(block: Block, walletSender: Wallet) {
    this.sockets.forEach((socket) => {
      this.sendBlock(socket, block, walletSender);
    });
  }

  sendBlock(socket: WebSocket, block: Block, walletSender: Wallet) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPE.block,
        block: block,
        walletSender,
      } as ChainMessageSocket),
    );
  }
}
