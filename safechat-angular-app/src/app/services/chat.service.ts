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

  public peerReady: Observable<boolean> = this._peerConnectionReady.asObservable();

  constructor() {
    const rd = `my-custom-id-${Math.random()}`.replace('.', '-')

    this._peer = new Peer(rd, {
      host: 'localhost',
      port: 9000,
      path: '/'
    });

    this._peer.on('open', (id: string) => {
      this._peerId = id;
      this._peerConnectionReady.next(true);
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
