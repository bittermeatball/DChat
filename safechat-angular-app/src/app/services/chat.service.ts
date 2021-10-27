import { Injectable } from '@angular/core';
import { DataConnection } from 'peerjs';
import Peer from 'peerjs';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _peer
  private _peerId = ''
  private _peerConnectionReady = new BehaviorSubject<boolean>(false);
  private _peerConnection = new BehaviorSubject<DataConnection | null>(null);

  public peerReady: Observable<boolean> = this._peerConnectionReady.asObservable();
  public peerConnection: Observable<DataConnection | null> = this._peerConnection.asObservable();

  constructor() {
    // => gửi backend IP + abc + def
    // => nhận key từ backend
    const tokenFromBackend = `my-custom-id-${Math.random()}`.replace('.', '-')

    // Khởi tạo 
    this._peer = new Peer(tokenFromBackend, {
      host: 'localhost',
      port: 9000,
      path: '/'
    });

    this._peer.on('open', (id: string) => {
      this._peerId = id;
      this._peerConnectionReady.next(true);
    });

    this._peer.on('connection', (connection: DataConnection) => {
      console.log('Connection established successfully')

      this._peerConnection.next(connection)
    });
  }

  public connectToPeer(peerId: string): DataConnection | null {
    if (this._peer) {
      return this._peer?.connect(peerId);
    } else {
      console.error('Something wrong happened! Cannot establish connection!')

      return null
    }
  }

  public getInstance() {
    return this._peer;
  }

  public getPeerId() {
    return this._peerId;
  }
}
