import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Auth } from 'src/app/core/models/auth.model';
import { Conversation } from 'src/app/core/models/conversation.model';
import { selectCurrentUser } from 'src/app/store/auth/auth.selectors';
import { AuthState } from 'src/app/store/auth/auth.state';
import { contacts, conversations } from 'src/mock';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

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
  @Output() onCreateConversation = new EventEmitter<Conversation>();

  PANEL = PANEL
  activePanel = PANEL.CONVERSATION
  conversations = conversations
  contacts = contacts

  currentUser: Auth | null = null

  constructor(
    private store: Store<{ auth: AuthState }>,
    public dialog: MatDialog
  ) {
    this.store.pipe(select(selectCurrentUser)).subscribe(currentUser => {
      this.currentUser = currentUser
    })
  }

  ngOnInit(): void {
  }

  handleSelectConversation(conversation: Conversation): void {
    this.onSelectConversation.emit(conversation);
  }

  handleSelectContact(contact: Auth): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '320px',
      data: { contact }
    });

    dialogRef.componentInstance.onChat.subscribe((contact: Auth) => {
      const _user = this.currentUser as Auth
      const _conversation = {
        id: Math.random() + '',
        title: `Conversation with ${contact.name}`,
        thumbnail: contact.avatar,
        contacts: [_user, contact],
        messages: [],
        images: [],
        files: [],
      }
      
      this.conversations.push(_conversation);
      this.onSelectConversation.emit(_conversation);
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
