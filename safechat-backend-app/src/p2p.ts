import WebSocket from 'ws';
import { MESSAGE_TYPE } from './rfr-chain/constant';
import { Block } from './rfr-chain/core/block';
import { RfRChain } from './rfr-chain/core/chain';
import { Transaction } from './rfr-chain/wallet/transaction';
import { TransactionPool } from './rfr-chain/wallet/transaction-pool';
import { Wallet } from './rfr-chain/wallet/wallet';

//declare the peer to peer server port
const P2P_PORT = Number.parseInt(process.env.P2P_PORT || '5001');

//list of address to connect to
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

export class P2PServer {
  public sockets: any[];

  constructor(
    public blockchain: RfRChain,
    public transactionPool: TransactionPool,
    public wallet: Wallet,
  ) {
    this.sockets = [];
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
      const data = JSON.parse(message as any);
      console.log('Recieved data from peer:', data.type);

      switch (data.type) {
        case MESSAGE_TYPE.chain:
          this.blockchain.replaceChain(data.chain);
          break;

        case MESSAGE_TYPE.transaction:
          let thresHoldReached = null;
          if (!this.transactionPool.transactionExists(data.transaction)) {
            thresHoldReached = this.transactionPool.addTransaction(
              data.transaction,
            );
            this.broadcastTransaction(data.transaction);
            // console.log(thresholdReached);
          }
          if (this.transactionPool.thresholdReached()) {
            console.log(this.blockchain.getLeader(), this.wallet.publicKey);

            if (this.blockchain.getLeader() == this.wallet.publicKey) {
              console.log('Creating block');
              const block = this.blockchain.createBlock(
                this.transactionPool.transactions,
                this.wallet,
              );
              this.broadcastBlock(block);
            }
          }

          break;

        case MESSAGE_TYPE.block:
          if (this.blockchain.isValidBlock(data.block)) {
            // this.blockchain.addBlock(data.block);
            // this.blockchain.executeTransactions(data.block);
            this.broadcastBlock(data.block);
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
        chain: this.blockchain.blocks,
      }),
    );
  }

  syncChain() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }

  broadcastTransaction(transaction: Transaction) {
    this.sockets.forEach((socket) => {
      this.sendTransaction(socket, transaction);
    });
  }

  sendTransaction(socket: WebSocket, transaction: Transaction) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPE.transaction,
        transaction: transaction,
      }),
    );
  }

  broadcastBlock(block: Block) {
    this.sockets.forEach((socket) => {
      this.sendBlock(socket, block);
    });
  }

  sendBlock(socket: WebSocket, block: Block) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPE.block,
        block: block,
      }),
    );
  }
}
