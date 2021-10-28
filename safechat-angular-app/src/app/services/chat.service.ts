import { Inject, Injectable } from '@angular/core';
import { DataConnection } from 'peerjs';
import Peer from 'peerjs';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.state';
import { setCurrentUser } from '../store/auth/auth.actions';
import { MatDialog } from '@angular/material/dialog';
import { VideoDialogComponent } from '../modules/chat/video-dialog/video-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _baseUrl: string;
  private _peerHost: string;
  private _peerPort: number;

  private _peer: Peer | undefined = undefined
  private _peerId = ''
  private _peerConnectionReady = new BehaviorSubject<boolean>(false);
  private _peerConnection = new BehaviorSubject<DataConnection | null>(null);

  public peerReady: Observable<boolean> = this._peerConnectionReady.asObservable();
  public peerConnection: Observable<DataConnection | null> = this._peerConnection.asObservable();

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private store: Store<AuthState>,
    private dialog: MatDialog, 
    @Inject('API_URL') baseUrl: string = '',
    @Inject('PEER_HOST') peerHost: string = '',
    @Inject('PEER_PORT') peerPort: number = 9000,
  ) {
    this._baseUrl = baseUrl;
    this._peerHost = peerHost;
    this._peerPort = peerPort;
  }

  public signIntoChain({ username }: { username: string }) {
    this.http.post(`${this._baseUrl}/account`, {
      username,
    }).subscribe((payload: any) => {
      const tokenFromBackend = payload.data.publicToken;

      localStorage.setItem('authToken', tokenFromBackend);
      localStorage.setItem('authUsername', username);

      this.store.dispatch(setCurrentUser({
        currentUser: {
          id: tokenFromBackend,
          username,
          avatar: 'https://res.cloudinary.com/i-m-rim/image/upload/v1627479900/dsc/dsc_icon_light_e46gne.png',
        }
      }))

      this.initPeerConnection(tokenFromBackend);
    }, (error: any) => {
      this._snackBar.open(error.error.message, '', { duration: 3000 });
    });
  }

  public initPeerConnection(peerId: string) {
    this._peer = new Peer(peerId, {
      host: this._peerHost,
      port: this._peerPort,
      path: '/'
    });

    this._peer.on('open', (id: string) => {
      console.log('Initiated user: ' + id)

      this._peerId = id;
      this._peerConnectionReady.next(true);
    });

    this._peer.on('connection', (connection: DataConnection) => {
      console.log('Connection established successfully')

      this._peerConnection.next(connection)
    });

    this._peer.on('call', (mediaConnection: Peer.MediaConnection) => {
      const confirm = window.confirm("Will you accept the call")

      if (confirm) {
        navigator.mediaDevices
          .getUserMedia({video: true, audio: true})
          .then((localStream: MediaStream) => {
            const videoDialogRef = this.dialog.open(VideoDialogComponent, {
              height: '400px',
              width: '600px',
            });
            videoDialogRef.componentInstance.attachStreamToLocal(localStream)

            mediaConnection.answer(localStream);
            mediaConnection.on("stream", function (remoteStream: MediaStream) {
              videoDialogRef.componentInstance.attachStreamToRemote(remoteStream)
            })
            mediaConnection.on('close', function (){
              alert("The videocall has finished");
            });
          })
          .catch(error => {
            console.log("Error during listening call")
            console.log(error)
          })
      }
    })
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

  public getPeer() {
    return this._peer;
  }
}
