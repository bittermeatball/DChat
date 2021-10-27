import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Auth } from 'src/app/core/models/auth.model';
import { Conversation } from 'src/app/core/models/conversation.model';
import { selectCurrentUser } from 'src/app/store/auth/auth.selectors';
import { AuthState } from 'src/app/store/auth/auth.state';
import { contacts, conversations } from 'src/mock';
import { AddContactDialogComponent } from './add-contact-dialog/add-contact-dialog.component';
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

  handleAddConversation(contact: Auth) {
    const _user = this.currentUser as Auth
    const _conversation = {
      id: contact.id,
      title: `Conversation with ${contact.name}`,
      thumbnail: contact.avatar,
      contacts: [_user, contact],
      messages: [],
      images: [],
      files: [],
    }
    
    this.conversations.push(_conversation);
    this.onSelectConversation.emit(_conversation);
  }

  handleAddContact(contactCode: string) {
    const _contact = {
      id: contactCode,
      name: contactCode,
      avatar: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
    }

    this.contacts.push(_contact);
    this.handleAddConversation(_contact);
  }

  handleSelectContact(contact: Auth): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '320px',
      data: { contact }
    });

    dialogRef.componentInstance.onChat.subscribe((contact: Auth) => {
      this.handleAddConversation(contact)
    })
  }

  handleShowContactDialog(): void {
    const dialogRef = this.dialog.open(AddContactDialogComponent, {
      width: '320px',
      data: {}
    });

    dialogRef.componentInstance.onAddContact.subscribe((contactCode: string) => {
      this.handleAddContact(contactCode)
    })
  }

}
