import { Component, OnInit } from '@angular/core';

interface User {
  id: string;
  name: string;
}

interface Message {
  id: string;
  sender: User;
  message?: string;
  images?: string[];
  files?: string[];
  createdAt: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  images: string[];
  files: string[];
}

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

}
