import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DataConnection } from 'peerjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from 'src/app/core/models/auth.model';
import { Conversation } from 'src/app/core/models/conversation.model';
import { Message } from 'src/app/core/models/message.model';
import { Utils } from 'src/app/core/utils';
import { ChatService } from 'src/app/services/chat.service';
import { setCurrentUser } from 'src/app/store/auth/auth.actions';
import { AuthState } from 'src/app/store/auth/auth.state';
import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  selectedConversation: Conversation | null = null

  chatConnection: DataConnection | null = null;
  chatConnectionReady: boolean = false;
  chatConnectionMyPeerId: string = '';

  public contacts: Auth[] = [];
  public conversations: Conversation[] = [];

  constructor(
    private chatService: ChatService,
    private store: Store<AuthState>,
    public dialog: MatDialog,
  ) {
    this.chatService.peerReady.subscribe((ready) => {
      if (ready) {
        this.chatConnectionReady = ready
        this.chatConnectionMyPeerId = this.chatService.getPeerId()
      }
    })
  }

  ngOnInit(): void {

    const _id = localStorage.getItem('authToken') || '';
    const _username = localStorage.getItem('authUsername') || '';

    const _contacts = localStorage.getItem('contacts');
    const _conversations = localStorage.getItem('conversations');

    if (!_id && !_username) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '320px',
        disableClose: true,
        data: { }
      });
  
      dialogRef.componentInstance.login.subscribe(({ username }) => {
        this.handleSignIn({ username })
      })
    } else {
      this.chatService.initPeerConnection(_id);

      this.store.dispatch(setCurrentUser({
        currentUser: {
          id: _id,
          username: _username,
          avatar: 'https://res.cloudinary.com/i-m-rim/image/upload/v1627479900/dsc/dsc_icon_light_e46gne.png',
        }
      }))
    }

    if (_contacts && _conversations) {
      this.contacts = JSON.parse(_contacts)
      this.conversations = JSON.parse(_conversations)
    }
  }

  chatConnectionMyShortenPeerId = () => Utils.shortenToken(this.chatConnectionMyPeerId || '')

  handleSignIn(payload: { username: string }) {
    this.chatService.signIntoChain(payload);
  }

  handleConnectToPeer(peerId: string) {
    this.chatConnection = this.chatService.connectToPeer(peerId) // Connect to the other side

    this.chatConnection?.on('open', () => {
      console.log('Opened connection to ' + peerId, this.chatConnection)
    });

    this.chatService.peerConnection.subscribe(connection => {
      // Receive messages
      connection?.on('data', (message: Message) => {
        this.selectedConversation?.messages.push(message)

        const _conversationIndex = this.conversations.findIndex(c => c.id === this.selectedConversation?.id)
        this.conversations[_conversationIndex] = this.selectedConversation as Conversation
  
        this._updateConversations()
      });
    })
  }

  handleCopyConnectionPeerId() {
    Utils.copyToClipboard(this.chatConnectionMyPeerId)
  }

  handleSelectConversation(conversation: Conversation) {
    this.handleConnectToPeer(conversation.id)
    this.selectedConversation = conversation;
  }

  handleSubmitMessage(message: Message) {
    if (this.chatConnection) {
      this.chatConnection?.send(message);
      this.selectedConversation?.messages.push(message)

      const _conversationIndex = this.conversations.findIndex(c => c.id === this.selectedConversation?.id)
      this.conversations[_conversationIndex] = this.selectedConversation as Conversation

      this._updateConversations()
    }
  }

  handleAddContact(contact: Auth) {
    const _contact = this.contacts.find(c => c.id === contact.id)
    if (!_contact) {
      this.contacts.push(contact)
      this._updateContacts()
    }
  }

  handleAddConversation(conversation: Conversation) {
    const _conversation = this.conversations.find(c => c.id === conversation.id)
    if (!_conversation) {
      this.conversations.push(conversation)
      this._updateConversations()
    }
  }

  _updateContacts() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts))
  }

  _updateConversations() {
    localStorage.setItem('conversations', JSON.stringify(this.conversations))
  }
}
