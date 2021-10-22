import { Component, OnInit } from '@angular/core';

interface Conversation {
  id: string;
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
