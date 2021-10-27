import { Component, OnInit } from '@angular/core';
import { DataConnection } from 'peerjs';
import { Conversation } from 'src/app/core/models/conversation.model';
import { Message } from 'src/app/core/models/message.model';
import { Utils } from 'src/app/core/utils';
import { ChatService } from 'src/app/services/chat.service';
import { conversations } from 'src/mock';

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

  constructor(
    private chatService: ChatService
  ) {
    this.chatService.peerReady.subscribe((ready) => {
      if (ready) {
        this.chatConnectionReady = ready
        this.chatConnectionMyPeerId = this.chatService.getPeerId()
      }
    })
  }

  ngOnInit(): void {}

  handleConnectToPeer(peerId: string) {
    // this.chatConnection = this.chatService.getInstance().connect(peerId) // Connect to the other side
    this.chatConnection = this.chatService.connectToPeer(peerId) // Connect to the other side

    this.chatConnection?.on('open', () => {
      console.log('Opened connection to ' + peerId, this.chatConnection)
    });

    this.chatService.peerConnection.subscribe(connection => {
      // Receive messages
      connection?.on('data', (message: Message) => {
        this.selectedConversation?.messages.push(message)
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
      console.log('Sent message')
      this.chatConnection?.send(message);
      this.selectedConversation?.messages.push(message)
    }
  }
}
