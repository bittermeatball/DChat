import { Component, OnInit } from '@angular/core';
import { DataConnection } from 'peerjs';
import { Conversation } from 'src/app/core/models/conversation.model';
import { Message } from 'src/app/core/models/message.model';
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
  chatConnectionPeerId: string = '';

  constructor(
    private chatService: ChatService
  ) {
    this.chatService.peerReady.subscribe((ready) => {
      if (ready) {
        const remoteClientId = '7836ac9c-76fe-4ac0-9998-28b68bf4e171'

        this.chatConnection = this.chatService.getInstance().connect(remoteClientId) // Connect to the other side

        this.chatConnection?.on('open', () => {
          // Receive messages
          this.chatConnection?.on('data', (data) => {
            console.log('Received', data);
          });
        });

        this.chatConnectionReady = ready
        this.chatConnectionPeerId = this.chatService.getPeerId()
      }
    })
  }

  ngOnInit(): void {}

  handleSelectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
  }

  handleSubmitMessage(message: Message) {
    if (this.chatConnectionReady) {
      this.chatConnection?.send(message);
      this.selectedConversation?.messages.push(message)
    }
  }
}
