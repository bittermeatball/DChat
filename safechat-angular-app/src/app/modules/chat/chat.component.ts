import { Component, OnInit } from '@angular/core';
import { Conversation } from 'src/app/core/models/conversation.model';
import { Message } from 'src/app/core/models/message.model';
import { conversations } from 'src/mock';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  selectedConversation: Conversation | null = null

  constructor() { }

  ngOnInit(): void {
  }

  handleSelectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
  }

  handleSubmitMessage(message: Message) {
    this.selectedConversation?.messages.push(message)
  }
}
