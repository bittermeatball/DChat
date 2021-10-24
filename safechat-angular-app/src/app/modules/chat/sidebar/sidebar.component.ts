import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Conversation } from 'src/app/core/models/conversation.model';
import { conversations } from 'src/mock';

enum PANEL {
  CONVERSATION = 'CONVERSATION',
  CONTACTS = 'CONTACTS',
  SHARING = 'SHARING',
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() onSelectConversation = new EventEmitter<Conversation>();

  PANEL = PANEL
  activePanel = PANEL.CONVERSATION
  conversations = conversations

  constructor() { }

  ngOnInit(): void {
  }

  handleSelectConversation(conversation: Conversation): void {
    this.onSelectConversation.emit(conversation);
  }

}
