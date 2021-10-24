import WebSocket from 'ws';
import { MESSAGE_TYPE } from './rfr-chain/constant';
import { Transaction } from './rfr-chain/core/transaction';
import { TransactionPool } from './rfr-chain/core/transaction-pool';
import { BlockChain } from './rfr-chain/interface/blockchain';

//declare the peer to peer server port
const P2P_PORT = Number.parseInt(process.env.P2P_PORT || '5001');

//list of address to connect to
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

export class P2PServer {
  public blockchain: BlockChain;
  public sockets: any[];
  public transactionPool: TransactionPool;

  constructor(blockchain: BlockChain, transactionPool: TransactionPool) {
    this.blockchain = blockchain;
    this.sockets = [];
    this.transactionPool = transactionPool;
  }

  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });

    // event listener and a callback function for any new connection
    // on any new connection the current instance will send the current chain
    // to the newly connected peer
    server.on('connection', (socket) => this.connectSocket(socket));

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
      console.log('Recieved data from peer:', data);

      switch (data.type) {
        case MESSAGE_TYPE.chain:
          this.blockchain.replaceChain(data.chain);
          break;

        case MESSAGE_TYPE.transaction:
          if (!this.transactionPool.transactionExists(data.transaction)) {
            this.transactionPool.addTransaction(data.transaction);
            this.broadcastTransaction(data.transaction);
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
}
