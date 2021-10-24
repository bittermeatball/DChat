import WebSocket from 'ws';
import { BlockChain } from './rfr-chain/interface/blockchain';

//declare the peer to peer server port
const P2P_PORT = Number.parseInt(process.env.P2P_PORT || '5001');

//list of address to connect to
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

export class P2PServer {
  public blockchain: BlockChain;
  public sockets: any[];

  constructor(blockchain: BlockChain) {
    this.blockchain = blockchain;
    this.sockets = [];
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
    // push the socket too the socket array
    this.sockets.push(socket);
    console.log('Socket connected');
    this.messageHandler(socket);
    socket.send(JSON.stringify(this.blockchain.blocks));
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
    socket.on('message', (message: any) => {
      const data = JSON.parse(message);
      console.log('data ', data);
      this.blockchain.replaceChain(data);
    });
  }

  sendChain(socket: any) {
    socket.send(JSON.stringify(this.blockchain.blocks));
  }

  syncChain() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }
}
